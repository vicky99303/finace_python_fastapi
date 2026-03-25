from fastapi import FastAPI
from .routers import auth, transactions, dashboard
from .database import Base, engine

# Create DB tables
Base.metadata.create_all(bind=engine)

# Enable debug mode here
app = FastAPI(debug=True)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(transactions.router, prefix="/transactions", tags=["Transactions"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])