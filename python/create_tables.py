# create_tables.py
from app.database import Base, engine
from app import models  # make sure all your models are imported here

def create_all_tables():
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("All tables created successfully!")

if __name__ == "__main__":
    create_all_tables()