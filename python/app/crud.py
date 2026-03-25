from .models import User
from .auth import hash_password

def create_user(db, user):
    db_user = User(
        email=user.email,
        password=hash_password(user.password)
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_email(db, email):
    return db.query(User).filter(User.email == email).first()