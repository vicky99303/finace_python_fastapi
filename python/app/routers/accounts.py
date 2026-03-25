from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.auth import get_current_user
from app.models import Account

router = APIRouter()

@router.post("/")
def create_account(name: str, db: Session = Depends(get_db), user=Depends(get_current_user)):
    account = Account(name=name, user_id=user.id)
    db.add(account)
    db.commit()
    db.refresh(account)

    return account