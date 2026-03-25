from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.auth import get_current_user
from app.models import Category
from app.schemas import CategoryCreate, CategoryOut  # <- import schemas

router = APIRouter()

@router.post("/", response_model=CategoryOut)
def create_category(
    data: CategoryCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    category = Category(
        name=data.name,
        type=data.type,
        user_id=user.id
    )

    db.add(category)
    db.commit()
    db.refresh(category)

    return category


@router.get("/", response_model=list[CategoryOut])
def list_categories(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(Category).filter(Category.user_id == user.id).all()