from random import choice

from backend.database.db_schema import Medicine, db
from sqlalchemy.sql import func


def get_medicine_detail(medicine_id: int):
    medicine_entity: Medicine = db.get_or_404(Medicine, medicine_id)
    return {"id": medicine_entity.id,
            "name": medicine_entity.name,
            "sukl_code": medicine_entity.sukl_code,
            "contraindications": medicine_entity.contraindications,
            "adverse_effects": medicine_entity.adverse_effects,
            "active_ingredients": [{"id": ingredient_with_dosage.active_ingredient.id,
                                    "name": ingredient_with_dosage.active_ingredient.name,
                                    "dosage": ingredient_with_dosage.dosage,
                                    "units": ingredient_with_dosage.units
                                    } for ingredient_with_dosage
                                   in medicine_entity.active_ingredients_with_dosage],
            "negative_interactions": [{"id": medicine.id,
                                       "name": medicine.name} for medicine
                                      in get_negative_interactions_for_medicine(medicine_entity)],
            "alternative_medicines": [{"id": medicine.id,
                                       "name": medicine.name,
                                       "sukl_code": medicine.sukl_code,
                                       "contraindications": medicine.contraindications,
                                       "adverse_effects": medicine.adverse_effects,
                                       "active_ingredients": [
                                           {"id": ingredient_with_dosage.active_ingredient.id,
                                            "name": ingredient_with_dosage.active_ingredient.name,
                                            "dosage": ingredient_with_dosage.dosage,
                                            "units": ingredient_with_dosage.units
                                            } for ingredient_with_dosage
                                           in medicine.active_ingredients_with_dosage],
                                       } for medicine
                                      in get_alternative_medicines(medicine_entity)]
            }


def get_negative_interactions_for_medicine(medicine: Medicine):
    return list(medicine.negative_interactions_1) + list(medicine.negative_interactions_2)


def get_alternative_medicines(medicine: Medicine):
    active_ingredients_with_dosage = medicine.active_ingredients_with_dosage
    return [medicine_with_dosage.medicine for active_ingredients_with_dosage in
            active_ingredients_with_dosage
            for medicine_with_dosage in
            list(active_ingredients_with_dosage.active_ingredient.medicines_with_dosage)
            if medicine_with_dosage.medicine != medicine]


def get_random_medicine_and_adverse_effect():
    random_medicine = Medicine.query.order_by(func.random()).first()
    random_adverse_effect = choice(random_medicine.adverse_effects)
    return {"name": random_medicine.name,
            "random_adverse_effect": random_adverse_effect}
