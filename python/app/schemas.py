# app/schemas.py
from pydantic import BaseModel, EmailStr
from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from pydantic import BaseModel, ConfigDict



class TransactionCreate(BaseModel):
    amount: float
    type: str  # deposit | withdrawal
    category_id: Optional[int] = None


class TransactionUpdate(BaseModel):
    amount: Optional[float] = None
    type: Optional[str] = None
    category_id: Optional[int] = None


class TransactionOut(BaseModel):
    id: int
    amount: float
    type: str
    category_id: Optional[int] = None

    class Config:
        from_attributes = True
# ------------------------------
# User schemas
# ------------------------------

# For creating/registering a user
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: Optional[str] = None

# For logging in
class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    email: EmailStr
    full_name: Optional[str] = None

    class Config:
        from_attributes = True   # ✅ instead of orm_mode

class CategoryCreate(BaseModel):
    name: str
    type: str  # income / expense


class CategoryOut(BaseModel):
    id: int
    name: str
    type: str

    class Config:
        from_attributes = True

class BudgetCreate(BaseModel):
    amount: float
    month: int
    year: int
    category_id: int

class BudgetOut(BaseModel):
    id: int
    amount: float
    month: int
    year: int
    category_id: int

    class Config:
        from_attributes = True


class GoalCreate(BaseModel):
    name: str
    target_amount: float

class GoalAddMoney(BaseModel):
    amount: float

class GoalOut(BaseModel):
    id: int
    name: str
    target_amount: float
    saved_amount: float

    model_config = ConfigDict(from_attributes=True)
class SettingsProfile(BaseModel):
    full_name: str
    email: str
    currency: str
    timezone: str


class SettingsPreferences(BaseModel):
    email_alerts: bool
    push_notifications: bool
    weekly_reports: bool
    dark_mode: bool


class SettingsResponse(BaseModel):
    profile: SettingsProfile
    preferences: SettingsPreferences


class SettingsUpdateProfile(BaseModel):
    full_name: str
    email: str
    currency: str
    timezone: str


class SettingsUpdatePreferences(BaseModel):
    email_alerts: bool
    push_notifications: bool
    weekly_reports: bool
    dark_mode: bool


class SettingsUpdateRequest(BaseModel):
    profile: SettingsUpdateProfile
    preferences: SettingsUpdatePreferences