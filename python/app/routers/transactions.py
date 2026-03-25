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