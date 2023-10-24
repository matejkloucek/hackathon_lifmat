from flask_restx import Namespace, Resource, fields

from backend.core.medicine_service import get_medicine_detail

medicine_api = Namespace("medicine", description='Medicine api')

active_ingredient_for_medicine_dto = medicine_api.model("ActiveIngredientForMedicineDto",
                                                        {
                                                            "id": fields.String(require=True),
                                                            "name": fields.String(required=True),
                                                            "dosage": fields.Integer(required=False),
                                                            "units": fields.String(required=False)
                                                        })

medicine_basic_out_dto = medicine_api.model("MedicineBasicOutDto",
                                            {
                                                 "id": fields.String(required=True),
                                                 "name": fields.String(required=True)
                                            })

medicine_detail_out_dto = medicine_api.model("MedicineDetailOutDto",
                                             {
                                                 "id": fields.String(required=True),
                                                 "name": fields.String(required=True),
                                                 "sukl_code": fields.Integer(required=True),
                                                 "contraindications": fields.List(fields.String(), required=True),
                                                 "adverse_effects": fields.List(fields.String(), required=True),
                                                 "active_ingredients": fields.List(fields.Nested(
                                                     active_ingredient_for_medicine_dto)),
                                                 "negative_interactions": fields.List(fields.Nested(
                                                     medicine_basic_out_dto
                                                 ))
                                             })


@medicine_api.route('/<int:id>')
class MedicineApi(Resource):
    @medicine_api.response(200, "Success", model=medicine_detail_out_dto)
    def get(self, id: int):
        """
        Get all medicines and active ingredients for search bar.
        """
        return get_medicine_detail(id)
