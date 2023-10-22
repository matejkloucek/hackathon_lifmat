from dotenv import dotenv_values

from flask import Flask
from flask_restx import Api

from backend.exceptions.error_handler import register_error_handlers

from backend.apis.hello_api import hello_api

app_config = dotenv_values(".env")


def create_app():
    flask_app = Flask(__name__)

    # setup db
    setup_db(flask_app)

    api = Api(flask_app)
    add_namespaces(api)

    register_error_handlers(api)

    return flask_app


def setup_db(flask_app):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = app_config["SQLALCHEMY_DATABASE_URI"]
    from backend.database.db_schema import db
    db.init_app(flask_app)
    with flask_app.app_context():
        db.create_all()  # creates all new tables from schema


def add_namespaces(api: Api):
    api.add_namespace(hello_api)


if __name__ == '__main__':
    app = create_app()
    app.run(host='localhost', port=8080, debug=True)
