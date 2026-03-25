# app/routers/dashboard.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.auth import get_current_user
from app.models import Account, Transaction

router = APIRouter()

@router.get("/summary")
def dashboard_summary(db: Session = Depends(get_db), user=Depends(get_current_user)):
    accounts = db.query(Account).filter(Account.user_id == user.id).all()
    transactions = db.query(Transaction).filter(Transaction.user_id == user.id).all()

    total_balance = sum(acc.balance for acc in accounts)
    total_income = sum(t.amount for t in transactions if t.type == "deposit")
    total_expense = sum(t.amount for t in transactions if t.type == "withdrawal")

    return {
        "total_balance": total_balance,
        "total_income": total_income,
        "total_expense": total_expense,
        "accounts": accounts,
        "transactions": transactions[-5:]  # last 5 transactions
    }