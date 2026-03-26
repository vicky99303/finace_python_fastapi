from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import extract
from app.database import get_db
from app.auth import get_current_user
from app.models import Transaction
from datetime import datetime

router = APIRouter()

@router.get("/dashboard")
def dashboard_report(db: Session = Depends(get_db), user=Depends(get_current_user)):
    transactions = db.query(Transaction).filter(
        Transaction.user_id == user.id
    ).all()

    total_income = sum(t.amount for t in transactions if t.type == "deposit")
    total_expense = sum(t.amount for t in transactions if t.type == "withdrawal")

    return {
        "total_income": total_income,
        "total_expense": total_expense,
        "balance": total_income - total_expense,
        "transactions_count": len(transactions)
    }
    
@router.get("/monthly")
def monthly_report(month: int, year: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    transactions = db.query(Transaction).filter(
        Transaction.user_id == user.id,
        extract("month", Transaction.created_at) == month,
        extract("year", Transaction.created_at) == year
    ).all()

    total_income = sum(t.amount for t in transactions if t.type == "deposit")
    total_expense = sum(t.amount for t in transactions if t.type == "withdrawal")

    return {
        "month": month,
        "year": year,
        "total_income": total_income,
        "total_expense": total_expense,
        "net": total_income - total_expense
    }
    
@router.get("/by-category")
def report_by_category(db: Session = Depends(get_db), user=Depends(get_current_user)):
    transactions = db.query(Transaction).filter(
        Transaction.user_id == user.id
    ).all()

    result = {}

    for t in transactions:
        cat = t.category.name if t.category else "Uncategorized"

        if cat not in result:
            result[cat] = {
                "income": 0,
                "expense": 0
            }

        if t.type == "deposit":
            result[cat]["income"] += t.amount
        else:
            result[cat]["expense"] += t.amount

    return result