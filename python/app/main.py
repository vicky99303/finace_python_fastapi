from fastapi import FastAPI
from .routers import auth, transactions, dashboard, rbac, accounts, categories, reports, budgets, goals
from .database import Base, engine

# Create DB tables
Base.metadata.create_all(bind=engine)

# Enable debug mode here
app = FastAPI(debug=True)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(transactions.router, prefix="/transactions", tags=["Transactions"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
app.include_router(rbac.router, prefix="/rbac", tags=["RBAC"])
app.include_router(accounts.router, prefix="/accounts", tags=["Accounts"])
app.include_router(categories.router, prefix="/categories", tags=["Categories"])
app.include_router(reports.router, prefix="/reports", tags=["Reports"])
app.include_router(budgets.router, prefix="/budgets", tags=["Budgets"])
app.include_router(goals.router, prefix="/goals", tags=["Goals"])