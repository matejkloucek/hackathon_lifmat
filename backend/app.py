from dotenv import dotenv_values

from flask import Flask, request
from flask_restx import Api

from backend.exceptions.error_handler import register_error_handlers

from backend.apis.hello_api import hello_api
from backend.apis.drugs_api import drugs_api

app_config = dotenv_values(".env")


def create_app():
    flask_app = Flask(__name__)

    def enable_cors():
        @flask_app.after_request
        def add_headers(response):
            allowed_origins = {
                'http://localhost:3000',  # localhost development
                #'https://127.0.0.1:9090'  # proxy on staging, support for swagger
            }
            origin = request.headers.get('origin')
            if origin in allowed_origins:
                response.headers.add('Access-Control-Allow-Origin', origin)
                response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
                response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
            return response

    # setup db
    setup_db(flask_app)

    # enable cors
    with flask_app.app_context():
        enable_cors()

    api = Api(flask_app)
    add_namespaces(api)

    register_error_handlers(api)

    return flask_app


def setup_db(flask_app):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = app_config["SQLALCHEMY_DATABASE_URI"]
    from backend.database.db_schema import db, Medicine, ActiveIngredient
    db.init_app(flask_app)
    with flask_app.app_context():
        db.create_all()  # creates all new tables from schema

        # seed with data
        active_ingredient = ActiveIngredient(name="Metronidazol")
        medicine1 = Medicine(sukl_code=100, name="Paralen", contraindications=[],
                             adverse_effects=["bolest hlavy"])
        medicine2 = Medicine(sukl_code=208, name="Blablalek", contraindications=[],
                             adverse_effects=["smrt"])
        db.session.add_all([active_ingredient, medicine1, medicine2])
        db.session.commit()



def enable_cors():
    @app.after_request
    def add_headers(response):
        allowed_origins = {
            'http://localhost:4200',  # localhost development
            'https://127.0.0.1:9090'  # proxy on staging, support for swagger
        }
        origin = request.headers.get('origin')
        if origin in allowed_origins:
            response.headers.add('Access-Control-Allow-Origin', origin)
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
            response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
        return response


def add_namespaces(api: Api):
    api.add_namespace(hello_api)
    api.add_namespace(drugs_api)


app = create_app()

if __name__ == '__main__':
    app.run(host='localhost', port=8080, debug=True)
