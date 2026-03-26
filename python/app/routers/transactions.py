# app/routers/transactions.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.auth import get_current_user
from app.models import Transaction
from app.auth import require_permission
from app import schemas, crud

router = APIRouter()

@router.get("/")
def list_transactions(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(Transaction).filter(Transaction.user_id == user.id).order_by(Transaction.date.desc()).all()

@router.post("/create")
def create_transaction(
    data: schemas.TransactionCreate,
    db: Session = Depends(get_db),
    user=Depends(require_permission("create_transaction"))
):
    return crud.create_transaction(db, user, data)
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.auth import get_current_user
from app.models import Transaction, Budget
from app.schemas import TransactionCreate, TransactionOut

router = APIRouter()


@router.post("/", response_model=dict)
def create_transaction(
    data: TransactionCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    # ✅ 1. Create Transaction
    transaction = Transaction(
        amount=data.amount,
        type=data.type,
        user_id=user.id,
        category_id=data.category_id
    )

    db.add(transaction)
    db.commit()
    db.refresh(transaction)

    # ✅ 2. Budget Check (Only for withdrawals)
    warning = None
    usage_percent = None

    if data.type == "withdrawal" and data.category_id:
        budget = db.query(Budget).filter(
            Budget.user_id == user.id,
            Budget.category_id == data.category_id
        ).first()

        if budget:
            # get all withdrawals for this category
            transactions = db.query(Transaction).filter(
                Transaction.user_id == user.id,
                Transaction.category_id == data.category_id,
                Transaction.type == "withdrawal"
            ).all()

            total_spent = sum(t.amount for t in transactions)

            # calculate %
            if budget.amount > 0:
                usage_percent = (total_spent / budget.amount) * 100

            # alerts
            if total_spent > budget.amount:
                warning = "❌ Budget exceeded!"
            elif total_spent >= budget.amount * 0.8:
                warning = "⚠️ 80% budget used"

    # ✅ 3. Response
    return {
        "transaction": {
            "id": transaction.id,
            "amount": transaction.amount,
            "type": transaction.type,
            "category_id": transaction.category_id
        },
        "budget_warning": warning,
        "usage_percent": round(usage_percent, 2) if usage_percent else None
    }