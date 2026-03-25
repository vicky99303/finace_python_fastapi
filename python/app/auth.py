# app/auth.py
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
from app import crud, database

SECRET_KEY = "X7p9JfK3vQz8Hn2bR1tL6mW0sU4eYqZd5gA3oVjN8xC0lF5w2a9rT1u6hB7cE"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 2

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


# ------------------------------
# Password utilities
# ------------------------------
def hash_password(password: str):
    truncated = password[:72]  # bcrypt max length
    return pwd_context.hash(truncated)

def verify_password(plain_password: str, hashed_password: str):
    truncated = plain_password[:72]
    return pwd_context.verify(truncated, hashed_password)


# ------------------------------
# Token utilities
# ------------------------------
def create_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    to_encode.update({"exp": expire})
    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return token


# ------------------------------
# Get current user dependency
# ------------------------------
def get_current_user(
    token: str = Depends(oauth2_scheme), 
    db: Session = Depends(database.get_db)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = crud.get_user_by_email(db, email=email)
    if user is None:
        raise credentials_exception

    return user