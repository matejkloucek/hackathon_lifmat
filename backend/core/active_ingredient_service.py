from backend.database.db_schema import ActiveIngredient, db


def get_active_ingredient_detail(active_ingredient_id: int):
    active_ingredient_entity: ActiveIngredient = db.get_or_404(ActiveIngredient,
                                                               active_ingredient_id)
    return {"id": active_ingredient_entity.id,
            "name": active_ingredient_entity.name,
            "medicines": [{"id": medicine_with_dosage.medicine.id,
                           "name": medicine_with_dosage.medicine.name,
                           "sukl_code": medicine_with_dosage.medicine.sukl_code,
                           "contraindications": medicine_with_dosage.medicine.contraindications,
                           "adverse_effects": medicine_with_dosage.medicine.adverse_effects,
                           "dosage": medicine_with_dosage.dosage,
                           "units": medicine_with_dosage.units,
                           "active_ingredients": [
                               {"id": ingredient_with_dosage.active_ingredient.id,
                                "name": ingredient_with_dosage.active_ingredient.name,
                                "dosage": ingredient_with_dosage.dosage,
                                "units": ingredient_with_dosage.units
                                } for ingredient_with_dosage
                               in medicine_with_dosage.medicine.active_ingredients_with_dosage],
                           "pdf_dropbox_link": medicine_with_dosage.medicine.pdf_dropbox_link
                           }
                          for medicine_with_dosage
                          in active_ingredient_entity.medicines_with_dosage]}
