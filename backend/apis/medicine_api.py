from flask_restx import Namespace, Resource, fields

from backend.core.medicine_service import get_medicine_detail, get_random_medicine_and_adverse_effect

medicine_api = Namespace("medicine", description='Medicine api')

active_ingredient_for_medicine_dto = medicine_api.model("ActiveIngredientForMedicineDto",
                                                        {
                                                            "id": fields.Integer(require=True),
                                                            "name": fields.String(required=True),
                                                            "dosage": fields.Float(required=False),
                                                            "units": fields.String(required=False)
                                                        })

medicine_basic_out_dto = medicine_api.model("MedicineBasicOutDto",
                                            {
                                                 "id": fields.Integer(required=True),
                                                 "name": fields.String(required=True),
                                                 "sukl_code": fields.Integer(required=True),
                                                 "contraindications": fields.List(fields.String(),
                                                                                 required=True),
                                                 "adverse_effects": fields.List(fields.String(),
                                                                               required=True),
                                                 "active_ingredients": fields.List(fields.Nested(
                                                    active_ingredient_for_medicine_dto)),
                                                 "pdf_dropbox_link": fields.String(required=False)
                                            })

medicine_detail_out_dto = medicine_api.model("MedicineDetailOutDto",
                                             {
                                                 "id": fields.Integer(required=True),
                                                 "name": fields.String(required=True),
                                                 "sukl_code": fields.Integer(required=True),
                                                 "contraindications": fields.List(fields.String(), required=True),
                                                 "adverse_effects": fields.List(fields.String(), required=True),
                                                 "active_ingredients": fields.List(fields.Nested(
                                                     active_ingredient_for_medicine_dto)),
                                                 "negative_interactions": fields.List(fields.Nested(
                                                     medicine_basic_out_dto
                                                 )),
                                                 "alternative_medicines": fields.List(fields.Nested(
                                                     medicine_basic_out_dto
                                                 )),
                                                 "pdf_dropbox_link": fields.String(required=False)
                                             })

medicine_random_out_dto = medicine_api.model("MedicineRandomOutDto",
                                            {
                                                 "name": fields.String(required=True),
                                                 "random_adverse_effect": fields.String(required=True)
                                            })


@medicine_api.route('/<int:id>')
class MedicineApi(Resource):
    @medicine_api.response(200, "Success", model=medicine_detail_out_dto)
    def get(self, id: int):
        """
        Get all medicines and active ingredients for search bar.
        """
        return get_medicine_detail(id)


@medicine_api.route('/random')
class MedicineApiRandom(Resource):
    @medicine_api.response(200, "Success", model=medicine_detail_out_dto)
    def get(self):
        """
        Get random medicine and its random adverse effect
        """
        return get_random_medicine_and_adverse_effect()
