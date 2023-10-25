from flask_restx import Namespace, Resource

from backend.core.chat_service import ask_chat

chat_api = Namespace("chat_api", description='Ask chat!')


@chat_api.route('/<string:text>')
class ChatApi(Resource):
    @chat_api.response(200, "Success")
    def get(self, text: str):
        """
        Ask Chat!
        """
        return ask_chat(text)
