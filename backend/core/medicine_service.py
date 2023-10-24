from backend.database.db_schema import Medicine, db


def get_medicine_detail(medicine_id: int):
    medicine_entity: Medicine = db.get_or_404(Medicine, medicine_id)
    return {"id": medicine_entity.id,
            "name": medicine_entity.name,
            "sukl_code": medicine_entity.sukl_code,
            "contraindication": medicine_entity.contraindications,
            "adverse_effects": medicine_entity.adverse_effects,
            "active_ingredients": [{"id": ingredient_with_dosage.active_ingredient.id,
                                    "name": ingredient_with_dosage.active_ingredient.name,
                                    "dosage": ingredient_with_dosage.dosage,
                                    "units": ingredient_with_dosage.units
                                    } for ingredient_with_dosage
                                   in medicine_entity.active_ingredients_with_dosage],
            "medicine_interactions": [{"id": medicine.id,
                                       "name": medicine.name} for medicine
                                      in medicine_entity.negative_interactions]
            }
