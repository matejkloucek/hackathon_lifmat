from flask_sqlalchemy import SQLAlchemy

from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import INTEGER, TEXT, ARRAY

db = SQLAlchemy()

active_ingredient_medicine = db.Table('active_ingredient_medicine',
                                      db.Column('active_ingredient_id', db.Integer,
                                                db.ForeignKey('active_ingredient.id')),
                                      db.Column('medicine_id', db.Integer,
                                                db.ForeignKey('medicine.id')))

medicine_disease = db.Table("medicine_disease",
                            db.Column('disease_id', db.Integer,
                                      db.ForeignKey('disease.id')),
                            db.Column('medicine_id', db.Integer,
                                      db.ForeignKey('medicine.id'))
                            )


class ActiveIngredient(db.Model):
    __tablename__ = "active_ingredient"

    id = Column(INTEGER, primary_key=True, autoincrement=True, nullable=False)
    name = Column(TEXT, nullable=False)


class Medicine(db.Model):
    __tablename__ = "medicine"

    id = Column(INTEGER, primary_key=True, autoincrement=True, nullable=False)
    sukl_code = Column(INTEGER, nullable=False)
    name = Column(TEXT, nullable=False)
    contraindications = Column(ARRAY(TEXT), nullable=False)
    adverse_effects = Column(ARRAY(TEXT), nullable=False)


class Disease(db.Model):
    __tablename__ = "disease"

    id = Column(INTEGER, primary_key=True, autoincrement=True, nullable=False)
    name = Column(TEXT)
