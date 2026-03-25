# app/schemas.py
from pydantic import BaseModel, EmailStr
from typing import Optional
from pydantic import BaseModel
from datetime import datetime

# Create Transaction
class TransactionCreate(BaseModel):
    amount: float
    type: str  # "deposit" or "withdrawal"
    description: Optional[str] = None
    account_id: int
    category_id: int

# Response
class TransactionOut(BaseModel):
    id: int
    amount: float
    type: str
    description: Optional[str]
    created_at: datetime

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