from flask_restx import Namespace, Resource, fields

hello_api = Namespace("hello", description='Hello!')


hello_world_dto_model = hello_api.model('HelloWorldDto', {
    'hello': fields.String(required=True, description='Say hello'),
    'status': fields.String(required=True, description='App status'),
})


@hello_api.route('/')
class HelloWorld(Resource):
    @hello_api.response(200, "Success", model=hello_world_dto_model)
    def get(self):
        """
        Hello!
        """
        return {"hello": "Hello!", "status": "OK"}
