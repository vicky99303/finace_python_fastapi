from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.auth import get_current_user
from app.models import Goal
from app.schemas import GoalCreate, GoalAddMoney, GoalOut
router = APIRouter()


@router.post("/", response_model=GoalOut)
def create_goal(
    data: GoalCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    goal = Goal(
        name=data.name,
        target_amount=data.target_amount,
        saved_amount=0,
        user_id=user.id
    )

    db.add(goal)
    db.commit()
    db.refresh(goal)

    return goal

@router.get("/", response_model=list[GoalOut])
def get_goals(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return db.query(Goal).filter(Goal.user_id == user.id).all()

@router.post("/add-money/{goal_id}", response_model=GoalOut)
def add_money(
    goal_id: int,
    data: GoalAddMoney,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    goal = db.query(Goal).filter(
        Goal.id == goal_id,
        Goal.user_id == user.id
    ).first()

    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")

    goal.saved_amount += data.amount

    db.commit()
    db.refresh(goal)

    return goal

@router.get("/progress/{goal_id}")
def goal_progress(
    goal_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    goal = db.query(Goal).filter(
        Goal.id == goal_id,
        Goal.user_id == user.id
    ).first()

    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")

    percentage = 0
    if goal.target_amount > 0:
        percentage = (goal.saved_amount / goal.target_amount) * 100

    return {
        "goal_id": goal.id,
        "name": goal.name,
        "saved": goal.saved_amount,
        "target": goal.target_amount,
        "progress_percent": round(percentage, 2),
        "completed": goal.saved_amount >= goal.target_amount
    }