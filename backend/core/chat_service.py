import os

import openai

from dotenv import dotenv_values

from backend.database.db_schema import db, Medicine
from backend.core.medicine_service import get_alternative_medicines


app_config = dotenv_values(".env")
openai.api_key = app_config["OPENAI_API_KEY"]


def ask_chat(text):
    prompt = "Dej název léku, o kterém se mluví v tomto text " \
                "(název MUSÍ být vždy jedno slovo začinající velkým písmenem a ostatní jsou malé " \
                f"(f.e. Metronidazol), pokud žádný není, tak pošli None): {text}. " \
                "Pak odpověď na otázky jenom jako True/False " \
             "(to je v poradku, kdyz všechy odpovědi jsou False, " \
             "když všechny otázky nejsou založeny přímým způsobem): " \
                "1) V tomto textu se ptá na alternativní léky pro zadaný lék? " \
                "2) V tomto textu se ptá na učinné látky pro tento lék? " \
                "3) V tomto textu se ptá na kontraindikace?" \
                "4) V tomto textu se ptá na nežadoucí (vedlejší) účinky tohoto léku?" \
                "Celý response dej jenom ve formatu json:" \
                '{"drug": str or None, ' \
                '"is_question_about_alternatives": True/False,' \
                '"is_question_about_active_ingredients": True/False,' \
                '"is_question_about_contraindications: True/False,' \
                '"is_question_about_adverse_effects": True/False}' \
             'Pouzité pojmy:' \
             '- Alternativní léky jsou léky se stejnou účinnou látkou.' \
             '- Interakce s jinými léky je popis s jakými léky dány lék nesmí brát nebo naopak může brát.' \
             '- Vedlejsí (nežádoucí) účinky jsou projevy organizmu, které mohou vzniknout kvůli brání léku'
    response = gpt(prompt)
    print(response)
    try:
        response = eval(response)

        if response['drug'] is None:
            return "Bohužel, Váš dotaz se netýka žádného léčivého přípravku."

        drug_entity = db.session.execute(
                    db.select(Medicine).filter_by(name=response['drug'])).first()[0]
        if drug_entity is None:
            return "Bohužel, zatím nemáme žádnou informaci pro tento lék."
        if response['is_question_about_alternatives']:
            alternative_medicines = [{"id": medicine.id,
                                      "name": medicine.name,
                                      "contraindications": medicine.contraindications,
                                      "adverse_effects": medicine.adverse_effects,
                                      "active_ingredients": [
                                          {"id": ingredient_with_dosage.active_ingredient.id,
                                           "name": ingredient_with_dosage.active_ingredient.name,
                                           "dosage": ingredient_with_dosage.dosage,
                                           "units": ingredient_with_dosage.units
                                           } for ingredient_with_dosage
                                          in medicine.active_ingredients_with_dosage],
                                      } for medicine in get_alternative_medicines(drug_entity)]
            prompt = f"Odpověď na otázku {text} pomocí této informace: {alternative_medicines}"
            return gpt(prompt)
        if response['is_question_about_active_ingredients']:
            active_ingredients = [
                {"id": ingredient_with_dosage.active_ingredient.id,
                 "name": ingredient_with_dosage.active_ingredient.name,
                 "dosage": ingredient_with_dosage.dosage,
                 "units": ingredient_with_dosage.units
                 } for ingredient_with_dosage
                in drug_entity.active_ingredients_with_dosage]
            prompt = f"Odpověď na otázku {text} pomocí této informace: {active_ingredients}"
            return gpt(prompt)
        if response['is_question_about_contraindications']:
            prompt = f"Odpověď na otázku {text} pomocí této informace: {drug_entity.contraindications}"
            return gpt(prompt)

        if response['is_question_about_adverse_effects']:
            prompt = f"Odpověď na otázku {text} pomocí této informace: {drug_entity.adverse_effects}"
            return gpt(prompt)

        with open(f'data_raw/SPC{drug_entity.sukl_code}.txt') as fd:
            document = fd.readlines()
        document = ''.join(document)
        prompt = f"Odpověď na otázku {text} pomocí této informace: {document}"
        try:
            return gpt(prompt)
        except openai.error.InvalidRequestError:
            prompt = f"Odpověď na otázku {text} pomocí této informace: {document}"[:8000]
            return gpt(prompt)

    except SyntaxError:
        return "GPT-3.5 answer: " + gpt(text)
    except KeyError:
        return "GPT-3.5 answer: " + gpt(text)


def gpt(prompt, model="gpt-3.5-turbo-0301"):
    messages = [{"role": "user", "content": prompt}]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0,)

    return response.choices[0].message["content"]
