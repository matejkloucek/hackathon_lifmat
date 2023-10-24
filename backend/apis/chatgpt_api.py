import openai
from os import listdir
from os.path import isfile, join
import time

# openai.api_key = "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"
# openai.api_key = "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"


start_time = time.time()

def get_completion(prompt, model="gpt-3.5-turbo-0301"):
    messages = [{"role": "user", "content": prompt}]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0,)

    return response.choices[0].message["content"]

def clean_data():
    pass


def main():
    openai.api_key = "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"

    prompt_file = "C:/Users/katka/Downloads/SPC_gpt_translated/format.txt"
    source_folder_path = "C:/Users/katka/Downloads/SPC_cleaned"
    final_folder_path = 'C:/Users/katka/Downloads/SPC_gpt_translated'

    onlyfiles = [f for f in listdir(source_folder_path) if isfile(join(source_folder_path, f))]
    for file_name in onlyfiles[2:3]:
        source_file = source_folder_path + '/' + file_name
        json_name = file_name.replace('txt', 'json')
        final_file = final_folder_path + "/" + json_name
        print("loading file")
        with open(source_file, 'r', encoding='utf-8') as f:
            document = f.read()
        print("file loaded, len of file =", len(document.split(' ')))

        with open(prompt_file, 'r', encoding='utf-8') as p:
            intro = p.read()
        prompt = intro + document

        print("sending request...")
        response = get_completion(prompt)
        print("request received")
        print(response)

        print("saving response")
        with open(final_file, 'w', encoding='utf-8') as f:
            f.write(response)
        print("response saved")

        end_time = time.time()
        execution_time = end_time - start_time
        print(f"Execution time: {execution_time:.2f} seconds")