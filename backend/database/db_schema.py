from flask_sqlalchemy import SQLAlchemy

from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import INTEGER, TEXT, ARRAY, FLOAT

db = SQLAlchemy()

medicine_disease = db.Table("medicine_disease",
                            db.Column('disease_id', db.Integer,
                                      db.ForeignKey('disease.id')),
                            db.Column('medicine_id', db.Integer,
                                      db.ForeignKey('medicine.id'))
                            )

medicine_interaction = db.Table("medicine_interaction",
                                db.Column('medicine_1_id', db.Integer,
                                          db.ForeignKey('medicine.id')),
                                db.Column('medicine_2_id', db.Integer,
                                          db.ForeignKey('medicine.id')))


class ActiveIngredient(db.Model):
    __tablename__ = "active_ingredient"

    id = Column(INTEGER, primary_key=True, autoincrement=True, nullable=False)
    name = Column(TEXT, nullable=False)
    medicines_with_dosage = db.relationship('ActiveIngredientInMedicine', backref='active_ingredient')


class Medicine(db.Model):
    __tablename__ = "medicine"

    id = Column(INTEGER, primary_key=True, autoincrement=True, nullable=False)
    sukl_code = Column(INTEGER, nullable=False)
    name = Column(TEXT, nullable=False)
    contraindications = Column(ARRAY(TEXT), nullable=False)
    adverse_effects = Column(ARRAY(TEXT), nullable=False)
    negative_interactions_1 = db.relationship(
        "Medicine",
        secondary=medicine_interaction,
        primaryjoin=(medicine_interaction.c.medicine_1_id == id),
        secondaryjoin=(medicine_interaction.c.medicine_2_id == id),
        backref=db.backref('negative_interactions_2', lazy='dynamic'),
        lazy='dynamic'
    )

    active_ingredients_with_dosage = db.relationship('ActiveIngredientInMedicine', backref='medicine')


class ActiveIngredientInMedicine(db.Model):
    id = Column(INTEGER, primary_key=True, autoincrement=True, nullable=False)
    active_ingredient_id = Column(INTEGER, ForeignKey('active_ingredient.id'))
    medicine_id = Column(INTEGER, ForeignKey('medicine.id'))
    dosage = Column(FLOAT, nullable=True)
    units = Column(TEXT, nullable=True)


class Disease(db.Model):
    __tablename__ = "disease"

    id = Column(INTEGER, primary_key=True, autoincrement=True, nullable=False)
    name = Column(TEXT)
