# app/routers/transactions.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.auth import get_current_user
from app.models import Transaction

router = APIRouter()

@router.get("/")
def list_transactions(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(Transaction).filter(Transaction.user_id == user.id).order_by(Transaction.date.desc()).all()