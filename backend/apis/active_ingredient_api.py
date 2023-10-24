from flask_restx import Namespace, Resource, fields

from backend.core.active_ingredient_service import get_active_ingredient_detail

active_ingredient_api = Namespace("active_ingredient", description='Active ingredient api')

active_ingredient_detail_dto = active_ingredient_api.model("ActiveIngredientDetailOutDto",
                                             {
                                                 "id": fields.String(required=True),
                                                 "name": fields.String(required=True)
                                                 # todo; "medicines": fields.Nested
                                             })


@active_ingredient_api.route('/<int:id>')
class ActiveIngredientApi(Resource):
    @active_ingredient_api.response(200, "Success", model=active_ingredient_detail_dto)
    def get(self, id: int):
        """
        Get active ingredient detail by id.
        """
        return get_active_ingredient_detail(id)
