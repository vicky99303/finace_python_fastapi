# app/routers/transactions.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.auth import get_current_user, require_permission
from app.models import Transaction, Budget
from app import schemas

router = APIRouter()


def calculate_budget_warning(db: Session, user_id: int, category_id: int | None, tx_type: str):
    warning = None
    usage_percent = None

    if tx_type == "withdrawal" and category_id:
        budget = db.query(Budget).filter(
            Budget.user_id == user_id,
            Budget.category_id == category_id,
        ).first()

        if budget:
            transactions = db.query(Transaction).filter(
                Transaction.user_id == user_id,
                Transaction.category_id == category_id,
                Transaction.type == "withdrawal",
            ).all()

            total_spent = sum(t.amount for t in transactions)

            if budget.amount > 0:
                usage_percent = (total_spent / budget.amount) * 100

            if total_spent > budget.amount:
                warning = "❌ Budget exceeded!"
            elif total_spent >= budget.amount * 0.8:
                warning = "⚠️ 80% budget used"

    return warning, round(usage_percent, 2) if usage_percent else None


@router.get("/")
def list_transactions(
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return (
        db.query(Transaction)
        .filter(Transaction.user_id == user.id)
        .order_by(Transaction.date.desc())
        .all()
    )


@router.get("/{transaction_id}")
def get_transaction(
    transaction_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    transaction = (
        db.query(Transaction)
        .filter(Transaction.id == transaction_id, Transaction.user_id == user.id)
        .first()
    )

    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")

    return transaction


@router.post("/")
def create_transaction(
    data: schemas.TransactionCreate,
    db: Session = Depends(get_db),
    user=Depends(require_permission("create_transaction")),
):
    transaction = Transaction(
        amount=data.amount,
        type=data.type,
        user_id=user.id,
        category_id=data.category_id,
    )

    db.add(transaction)
    db.commit()
    db.refresh(transaction)

    warning, usage_percent = calculate_budget_warning(
        db, user.id, data.category_id, data.type
    )

    return {
        "transaction": {
            "id": transaction.id,
            "amount": transaction.amount,
            "type": transaction.type,
            "category_id": transaction.category_id,
        },
        "budget_warning": warning,
        "usage_percent": usage_percent,
    }


@router.put("/{transaction_id}")
def update_transaction(
    transaction_id: int,
    data: schemas.TransactionUpdate,
    db: Session = Depends(get_db),
    user=Depends(require_permission("update_transaction")),
):
    transaction = (
        db.query(Transaction)
        .filter(Transaction.id == transaction_id, Transaction.user_id == user.id)
        .first()
    )

    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")

    update_data = data.dict(exclude_unset=True)

    for field, value in update_data.items():
        setattr(transaction, field, value)

    db.commit()
    db.refresh(transaction)

    warning, usage_percent = calculate_budget_warning(
        db,
        user.id,
        transaction.category_id,
        transaction.type,
    )

    return {
        "transaction": {
            "id": transaction.id,
            "amount": transaction.amount,
            "type": transaction.type,
            "category_id": transaction.category_id,
        },
        "budget_warning": warning,
        "usage_percent": usage_percent,
    }


@router.delete("/{transaction_id}")
def delete_transaction(
    transaction_id: int,
    db: Session = Depends(get_db),
    user=Depends(require_permission("delete_transaction")),
):
    transaction = (
        db.query(Transaction)
        .filter(Transaction.id == transaction_id, Transaction.user_id == user.id)
        .first()
    )

    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")

    db.delete(transaction)
    db.commit()

    return {"message": "Transaction deleted successfully"}