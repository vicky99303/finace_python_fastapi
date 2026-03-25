from .models import User,Account, Category, Transaction
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

def create_transaction(db, user, data):
    account = db.query(Account).filter(
        Account.id == data.account_id,
        Account.user_id == user.id
    ).first()

    category = db.query(Category).filter(
        Category.id == data.category_id,
        Category.user_id == user.id
    ).first()

    if not account or not category:
        raise Exception("Invalid account or category")

    if data.type == "withdrawal":
        if account.balance < data.amount:
            raise Exception("Insufficient balance")
        account.balance -= data.amount

    elif data.type == "deposit":
        account.balance += data.amount

    transaction = Transaction(
        amount=data.amount,
        type=data.type,
        account_id=account.id,
        category_id=category.id,
        user_id=user.id
    )

    db.add(transaction)
    db.commit()

    return transaction