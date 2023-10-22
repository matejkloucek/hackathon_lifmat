from flask import Flask
from flask_restx import Api

from backend.exceptions.error_handler import register_error_handlers

from backend.apis.hello_api import hello_api


def create_app():
    flask_app = Flask(__name__)

    api = Api(flask_app)
    add_namespaces(api)

    register_error_handlers(api)

    return flask_app


def add_namespaces(api: Api):
    api.add_namespace(hello_api)


if __name__ == '__main__':
    app = create_app()
    app.run(host='localhost', port=8080, debug=True)
