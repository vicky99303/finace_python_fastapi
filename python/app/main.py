from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  
from .routers import auth, transactions, dashboard, rbac, accounts, categories, reports, budgets, goals, settings
from .database import Base, engine

# Create DB tables
Base.metadata.create_all(bind=engine)

# Enable debug mode here
app = FastAPI(debug=True)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
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
app.include_router(settings.router, prefix="/settings", tags=["Settings"])