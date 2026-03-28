from datetime import datetime, timedelta

from app.database import SessionLocal
from app.models import User, Account, Category, Budget, Transaction


def run():
    db = SessionLocal()

    try:
        # prevent duplicate seed
        existing_user = db.query(User).filter(User.email == "us1er@example.com").first()
        if existing_user:
            user = existing_user
            print(f"Using existing user: {user.email}")
        else:
            user = User(
                name="Demo User",
                email="us1er@example.com",
                hashed_password=get_password_hash("password123"),  # or password=
            )
            db.add(user)
            db.commit()
            db.refresh(user)
            print("Created new user")

        # categories
        food = Category(name="Food", user_id=user.id)
        transport = Category(name="Transport", user_id=user.id)
        salary = Category(name="Salary", user_id=user.id)
        shopping = Category(name="Shopping", user_id=user.id)

        db.add_all([food, transport, salary, shopping])
        db.commit()

        # refresh categories
        db.refresh(food)
        db.refresh(transport)
        db.refresh(salary)
        db.refresh(shopping)

        # accounts
        bank = Account(
            name="HBL Main Account",
            type="bank",
            balance=25000,
            user_id=user.id,
        )
        wallet = Account(
            name="JazzCash Wallet",
            type="wallet",
            balance=5000,
            user_id=user.id,
        )

        db.add_all([bank, wallet])
        db.commit()
        db.refresh(bank)
        db.refresh(wallet)
        
        now = datetime.utcnow()
        # budgets
        budget_food = Budget(
            amount=10000,
            month=now.month,
            year=now.year,
            user_id=user.id,
            category_id=food.id,
        )

        budget_transport = Budget(
            amount=5000,
            month=now.month,
            year=now.year,
            user_id=user.id,
            category_id=transport.id,
        )

        db.add_all([budget_food, budget_transport])
        db.commit()

        # transactions
        transactions = [
            Transaction(
                amount=120000,
                type="deposit",
                description="Monthly Salary",
                account_id=bank.id,
                category_id=salary.id,
                user_id=user.id,
                date=datetime.utcnow() - timedelta(days=10),
            ),
            Transaction(
                amount=2500,
                type="withdrawal",
                description="Groceries",
                account_id=bank.id,
                category_id=food.id,
                user_id=user.id,
                date=datetime.utcnow() - timedelta(days=8),
            ),
            Transaction(
                amount=1200,
                type="withdrawal",
                description="Taxi and fuel",
                account_id=wallet.id,
                category_id=transport.id,
                user_id=user.id,
                date=datetime.utcnow() - timedelta(days=7),
            ),
            Transaction(
                amount=3200,
                type="withdrawal",
                description="Shopping mall",
                account_id=bank.id,
                category_id=shopping.id,
                user_id=user.id,
                date=datetime.utcnow() - timedelta(days=5),
            ),
            Transaction(
                amount=1800,
                type="withdrawal",
                description="Restaurant",
                account_id=wallet.id,
                category_id=food.id,
                user_id=user.id,
                date=datetime.utcnow() - timedelta(days=3),
            ),
        ]

        db.add_all(transactions)
        db.commit()

        print("Sample data inserted successfully.")
        print("Login: demo@example.com / password123")

    except Exception as e:
        db.rollback()
        print("Seed failed:", str(e))
        raise
    finally:
        db.close()


if __name__ == "__main__":
    run()