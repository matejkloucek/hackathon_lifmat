from backend.database.db_schema import Medicine, ActiveIngredient


def get_all_medicines_and_active_ingredients():
    medicines = Medicine.query.all()
    active_ingredients = ActiveIngredient.query.all()

    medicine_dtos = [{"id": medicine.id, "name": medicine.name, "type": "medicine"}
                     for medicine in medicines]
    active_ingredient_dtos = [{"id": active_ingredient.id,
                               "name": active_ingredient.name,
                               "type": "active_ingredient"}
                              for active_ingredient in active_ingredients]

    return medicine_dtos + active_ingredient_dtos
