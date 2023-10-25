import os
import json

from dotenv import dotenv_values
from dropbox import DropboxOAuth2FlowNoRedirect, Dropbox
from dropbox.exceptions import ApiError as DropboxApiError

from flask import Flask, request
from flask_restx import Api

from backend.exceptions.error_handler import register_error_handlers

from backend.apis.hello_api import hello_api
from backend.apis.drugs_api import drugs_api
from backend.apis.medicine_api import medicine_api
from backend.apis.active_ingredient_api import active_ingredient_api
from backend.apis.chat_api import chat_api

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
    from backend.database.db_schema import db, Medicine, \
        ActiveIngredient, ActiveIngredientInMedicine
    db.init_app(flask_app)
    with flask_app.app_context():
        db.create_all()  # creates all new tables from schema

        # seed with data
        """
        active_ingredient = ActiveIngredient(name="Metronidazol")
        medicine1 = Medicine(sukl_code=100, name="Paralen", contraindications=[],
                             adverse_effects=["bolest hlavy"])
        medicine2 = Medicine(sukl_code=208, name="Blablalek", contraindications=[],
                             adverse_effects=["smrt"])
        db.session.add_all([active_ingredient, medicine1, medicine2])
        db.session.commit()
        """

    # import data if needed
    def import_data():
        # read json
        parsed_medicine_names = []
        for spc_json_filename in os.scandir("data"):
            print(spc_json_filename.path)
            with open(spc_json_filename.path, 'r') as fd:
                data = json.load(fd)

            # get medicine name
            full_name_list = data['nazev_pripravku'].split()
            medicine_name = full_name_list[0].lower().capitalize()\
                .replace(',', '')
            assert medicine_name != ""
            if medicine_name in parsed_medicine_names:
                # todo: better this
                continue
            else:
                parsed_medicine_names.append(medicine_name)

            # get sucl code
            sukl_code = spc_json_filename.name.replace('.json', '').replace('SPC', '')

            # get medicine active ingredients
            active_ingredients = []
            for data_ingredient in data['slozeni']:
                ingredient_name = data_ingredient['nazev'].lower()
                assert ingredient_name != "" and ingredient_name is not None

                dosage = data_ingredient['mnozstvi']
                if type(dosage) == str:
                    dosage = dosage.replace(',', '.')
                try:
                    dosage = float(dosage)
                except ValueError:
                    dosage = None
                except TypeError:
                    dosage = None

                if dosage is not None:
                    units = data_ingredient['jednotky']
                else:
                    units = None

                active_ingredients.append((ingredient_name, dosage, units))

            # get contraindications
            if type(data['kontraindikace']) == str:
                contraindications = [data['kontraindikace']]
            else:
                contraindications = [contraindication['nazev_kontraindikace']
                                     for contraindication in data['kontraindikace']]
            if type(data['tehotenstvi']) == str:
                pregnancy = [data['tehotenstvi']]
            else:
                pregnancy = [contraindication for contraindication in data['tehotenstvi']]
            contraindications = pregnancy + contraindications

            # get adverse effects
            adverse_effects = [adverse_effect['nazev'].lower()
                               for adverse_effect in data['nezadouci_ucinky']]
            if len(adverse_effects) == 1:
                # remove if no adverse effects in fact
                if 'žádn' in adverse_effects[0]:
                    adverse_effects = []

            # import ingredients
            active_ingredients_entities = []
            for ingredient in active_ingredients:
                ingredient_in_db = db.session.execute(
                    db.select(ActiveIngredient).filter_by(name=ingredient[0])).first()
                if ingredient_in_db:
                    ingredient_entity = ingredient_in_db
                else:
                    ingredient_entity = ActiveIngredient(name=ingredient[0])
                    db.session.add(ingredient_entity)
                    db.session.commit()
                if type(ingredient_entity) != ActiveIngredient:
                    ingredient_entity = ingredient_entity[0]
                active_ingredients_entities.append((ingredient_entity, ingredient[1], ingredient[2]))

            # import medicine
            medicine_entity = Medicine(name=medicine_name,
                                       sukl_code=sukl_code,
                                       contraindications=contraindications,
                                       adverse_effects=adverse_effects,
                                       active_ingredients_with_dosage=[
                                           ActiveIngredientInMedicine(
                                               active_ingredient_id=ingredient.id,
                                               dosage=dosage,
                                               units=units
                                           ) for ingredient, dosage, units in active_ingredients_entities])
            db.session.add(medicine_entity)

    def import_dropbox_pdfs():
        dropbox_api_key = app_config['DROPBOX_API_KEY']
        dropbox_api_secret = app_config['DROPBOX_API_SECRET']

        auth_flow = DropboxOAuth2FlowNoRedirect(dropbox_api_key, dropbox_api_secret)
        authorize_url = auth_flow.start()
        print("1. Go to: " + authorize_url)
        print("2. Click \"Allow\" (you might have to log in first).")
        print("3. Copy the authorization code.")
        auth_code = input("Enter the authorization code here: ").strip()

        try:
            oauth_result = auth_flow.finish(auth_code)
        except Exception as e:
            print('Error: %s' % (e,))
            exit(1)

        # Initialize the Dropbox client
        dbx = Dropbox(oauth2_access_token=oauth_result.access_token)

        medicines = Medicine.query.all()
        for medicine in medicines:
            file_path = f'/SPC{medicine.sukl_code}.pdf'

            try:
                shared_link = dbx.sharing_create_shared_link(file_path)
            except DropboxApiError as e:
                continue

            print(shared_link.url)
            medicine.pdf_dropbox_link = shared_link.url

        db.session.commit()


    # uncomment if empty db
    #with flask_app.app_context():
       # import_data()
        #import_dropbox_pdfs()


def enable_cors():
    @app.after_request
    def add_headers(response):
        allowed_origins = {
            'http://localhost:3000',  # localhost development
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
    api.add_namespace(medicine_api)
    api.add_namespace(active_ingredient_api)
    api.add_namespace(chat_api)


app = create_app()


if __name__ == '__main__':
    app.run(host='localhost', port=8080, debug=True)
