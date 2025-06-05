from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


engine = create_engine("postgresql://songrec:songrecpass@db:5432/songrecdb")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
