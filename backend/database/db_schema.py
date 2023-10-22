from flask_sqlalchemy import SQLAlchemy

from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import INTEGER, TEXT

db = SQLAlchemy()


class Book(db.Model):
    __tablename__ = "book"

    id = Column(INTEGER, primary_key=True, autoincrement=True, nullable=False)
    name = Column(TEXT, nullable=False)
    author = Column(TEXT, nullable=False)


class Student(db.Model):
    __tablename__ = "student"

    id = Column(INTEGER, primary_key=True, autoincrement=True, nullable=False)
    name = Column(TEXT, nullable=False)
    age = Column(INTEGER, nullable=True)
    book = Column(INTEGER, ForeignKey('book.id', onupdate='CASCADE', ondelete='SET NULL'),
                  unique=True, nullable=True)
