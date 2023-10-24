from flask_restx import Namespace, Resource, fields

from backend.core.drugs_service import get_all_medicines_and_active_ingredients

drugs_api = Namespace("drugs", description='Drugs api')

drugs_or_active_ingredient_dto_model = drugs_api.model("DrugsOrActiveIngredientOutDto",
                                                       {
                                                           "id": fields.String,
                                                           "name": fields.String,
                                                           "type": fields.String
                                                       })
drugs_and_active_ingredients_dto_model = drugs_api.model('DrugsAndActiveIngredientsOutDto',
                                                         {
                                                             "items": fields.List(fields.Nested(
                                                                 drugs_or_active_ingredient_dto_model))
                                                         })


@drugs_api.route('/all')
class HelloWorld(Resource):
    @drugs_api.response(200, "Success", model=drugs_and_active_ingredients_dto_model)
    def get(self):
        """
        Get all medicines and active ingredients for search bar.
        """
        return {"items": get_all_medicines_and_active_ingredients()}
