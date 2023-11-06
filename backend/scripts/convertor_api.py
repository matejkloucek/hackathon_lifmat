from os import listdir
from os.path import isfile, join

import convertapi
key = "ualb4VgOzTYu4qOV" #your-api-secret


folder_path = 'C:/Users/katka/Downloads/SPC'
final_file_path = 'C:/Users/katka/Downloads/SPC_final'

onlyfiles = [f for f in listdir(folder_path) if isfile(join(folder_path, f))]

i = 0
for file_name in onlyfiles:
    file_path = folder_path + '/' + file_name
    convertapi.api_secret = key
    convertapi.convert('txt', {
        'File': file_path
    }, from_format = 'pdf').save_files(final_file_path)
    i += 1
    print(i)