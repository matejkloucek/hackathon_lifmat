from flask_restx import Namespace, Resource, fields

from backend.core.active_ingredient_service import get_active_ingredient_detail

active_ingredient_api = Namespace("active_ingredient", description='Active ingredient api')

active_ingredient = active_ingredient_api.model("ActiveIngredientDto",
                                                        {
                                                            "id": fields.Integer(require=True),
                                                            "name": fields.String(required=True),
                                                            "dosage": fields.Float(required=False),
                                                            "units": fields.String(required=False)
                                                        })

medicine_for_active_ingredient = active_ingredient_api.model("MedicineForActiveIngredientOutDto",
                                            {
                                                 "id": fields.Integer(required=True),
                                                 "name": fields.String(required=True),
                                                 "sukl_code": fields.Integer(required=True),
                                                 "contraindications": fields.List(fields.String(),
                                                                                  required=True),
                                                 "adverse_effects": fields.List(fields.String(),
                                                                                required=True),
                                                 "active_ingredients": fields.List(fields.Nested(
                                                     active_ingredient)),
                                                 "dosage": fields.Float(required=False),
                                                 "units": fields.String(required=False),
                                                 "pdf_dropbox_link": fields.String(required=False)
                                            })

active_ingredient_detail_dto = active_ingredient_api.model("ActiveIngredientDetailOutDto",
                                             {
                                                 "id": fields.Integer(required=True),
                                                 "name": fields.String(required=True),
                                                 "medicines": fields.List(fields.Nested(
                                                     medicine_for_active_ingredient))
                                             })


@active_ingredient_api.route('/<int:id>')
class ActiveIngredientApi(Resource):
    @active_ingredient_api.response(200, "Success", model=active_ingredient_detail_dto)
    def get(self, id: int):
        """
        Get active ingredient detail by id.
        """
        return get_active_ingredient_detail(id)
