from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.auth import get_current_user
from app.models import User, UserSettings
from app.schemas import SettingsResponse, SettingsUpdateRequest

router = APIRouter()


def get_or_create_settings(db: Session, user_id: int) -> UserSettings:
    settings = db.query(UserSettings).filter(UserSettings.user_id == user_id).first()

    if not settings:
        settings = UserSettings(
            user_id=user_id,
            full_name="",
            currency="USD",
            timezone="Asia/Karachi",
            email_alerts=True,
            push_notifications=False,
            weekly_reports=True,
            dark_mode=False,
        )
        db.add(settings)
        db.commit()
        db.refresh(settings)

    return settings


@router.get("/", response_model=SettingsResponse)
def get_settings(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    settings = get_or_create_settings(db, user.id)

    return {
        "profile": {
            "full_name": settings.full_name or "",
            "email": user.email,
            "currency": settings.currency or "USD",
            "timezone": settings.timezone or "Asia/Karachi",
        },
        "preferences": {
            "email_alerts": settings.email_alerts,
            "push_notifications": settings.push_notifications,
            "weekly_reports": settings.weekly_reports,
            "dark_mode": settings.dark_mode,
        },
    }


@router.put("/", response_model=SettingsResponse)
def update_settings(
    payload: SettingsUpdateRequest,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    settings = get_or_create_settings(db, user.id)

    settings.full_name = payload.profile.full_name
    settings.currency = payload.profile.currency
    settings.timezone = payload.profile.timezone

    settings.email_alerts = payload.preferences.email_alerts
    settings.push_notifications = payload.preferences.push_notifications
    settings.weekly_reports = payload.preferences.weekly_reports
    settings.dark_mode = payload.preferences.dark_mode

    user.email = payload.profile.email

    db.commit()
    db.refresh(settings)
    db.refresh(user)

    return {
        "profile": {
            "full_name": settings.full_name or "",
            "email": user.email,
            "currency": settings.currency or "USD",
            "timezone": settings.timezone or "Asia/Karachi",
        },
        "preferences": {
            "email_alerts": settings.email_alerts,
            "push_notifications": settings.push_notifications,
            "weekly_reports": settings.weekly_reports,
            "dark_mode": settings.dark_mode,
        },
    }