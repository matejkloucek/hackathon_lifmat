from backend.database.db_schema import ActiveIngredient, db


def get_active_ingredient_detail(active_ingredient_id: int):
    active_ingredient_entity: ActiveIngredient = db.get_or_404(ActiveIngredient,
                                                               active_ingredient_id)
    return {"id": active_ingredient_entity.id,
            "name": active_ingredient_entity.name}
