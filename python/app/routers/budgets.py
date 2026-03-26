from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.auth import get_current_user
from app.models import Budget, Transaction
from app.schemas import BudgetCreate, BudgetOut

router = APIRouter()

@router.post("/", response_model=BudgetOut)
def create_budget(
    data: BudgetCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    budget = Budget(
        amount=data.amount,
        month=data.month,
        year=data.year,
        category_id=data.category_id,
        user_id=user.id
    )

    db.add(budget)
    db.commit()
    db.refresh(budget)

    return budget

@router.get("/")
def get_budgets(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(Budget).filter(Budget.user_id == user.id).all()

@router.get("/status")
def budget_status(db: Session = Depends(get_db), user=Depends(get_current_user)):
    budgets = db.query(Budget).filter(Budget.user_id == user.id).all()

    result = []

    for b in budgets:
        spent = db.query(Transaction).filter(
            Transaction.user_id == user.id,
            Transaction.category_id == b.category_id
        ).all()

        total_spent = sum(t.amount for t in spent if t.type == "withdrawal")

        percentage = (total_spent / b.amount) * 100 if b.amount > 0 else 0

        alert = None
        if percentage >= 100:
            alert = "❌ Budget Exceeded"
        elif percentage >= 80:
            alert = "⚠️ Near Limit"

        result.append({
            "category_id": b.category_id,
            "budget": b.amount,
            "spent": total_spent,
            "remaining": b.amount - total_spent,
            "usage_percent": round(percentage, 2),
            "alert": alert
        })

    return result