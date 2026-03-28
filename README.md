# Finance Management System

A full-stack Finance Management System built with **FastAPI** for the backend and **React + TypeScript** for the frontend.  
This project helps users manage income, expenses, budgets, goals, categories, accounts, reports, and personal settings through a modern dashboard.

---

## Features

- User authentication and authorization
- Dashboard overview with financial summary
- Transaction management
- Budget management
- Financial goals tracking
- Accounts management
- Categories management
- Reports and analytics
- User settings
- Role-based access control (RBAC)

---

## Tech Stack

### Backend
- FastAPI
- SQLAlchemy
- Pydantic
- JWT Authentication
- SQLite / PostgreSQL
- Uvicorn

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router

---

## Project Structure

finance-management-system/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── routers/
│   │   ├── core/
│   │   └── utils/
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
└── README.md

---

## Setup Instructions

### Backend

cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt

Create .env file:

DATABASE_URL=sqlite:///./finance.db
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

Run server:

uvicorn app.main:app --reload

---

### Frontend

cd frontend
npm install

Create .env:

VITE_API_BASE_URL=http://127.0.0.1:8000

Run:

npm run dev

---

## Author

Abdul Waqar
