from os import listdir
from os.path import isfile, join

input_folder_path = 'C:/Users/katka/Downloads/SPC_final'
# file_name = 'SPC101234.txt'
final_folder_path = 'C:/Users/katka/Downloads/SPC_cleaned'

# input_path = input_folder_path + '/' + file_name


section_markers = ["NÁZEV PŘÍPRAVKU",
                   "KVALITATIVNÍ A KVANTITATIVNÍ SLOŽENÍ",
                   "Kontraindikace",
                   "Interakce s jinými léčivými přípravky a jiné formy interakce",
                   "Fertilita, těhotenství a kojení",
                   "Nežádoucí účinky",
                   "Seznam pomocných látek",
                   "Inkompatibility"]
stop_markers = ["LÉKOVÁ FORMA",
                "Zvláštní upozornění a opatření pro použití",
                "Účinky na schopnost řídit a obsluhovat stroje",
                "Předávkování",
                "Doba použitelnosti"]
final_stop = "Doba použitelnosti"


def shortify_file(input_path):
    current_section = None
    sections = {}
    with open(input_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()
        current_content = []

        for line in lines:
            # print(line)
            if any(marker in line for marker in section_markers):  # start markers
                if current_section is not None:
                    sections[current_section] = current_content
                    current_content = []
                    current_section = None
                current_section = line

            elif any(marker in line for marker in stop_markers):  # stop markers
                if current_section is not None:
                    sections[current_section] = current_content
                    current_content = []
                    current_section = None
            else:
                if final_stop in line:
                    # print("broke")
                    break
                if current_section is not None:
                    if (
                            line != '\n' and
                            "www" not in line and
                            "Praha" not in line and
                            "Státní ústav" not in line and
                            "Strana " not in line and
                            "Hlášení podezření" not in line
                    ):
                        current_content.append(line)

        # Store the last chapter
        if current_section is not None:
            sections[current_section] = current_content
    return sections
def stringify(sections):
    final_str = ''
    print(type(sections))
    assert type(sections) == dict
    for section_name, section_contents in sections.items():
        final_str += section_name
        for element in section_contents:
            final_str += element
    return final_str

onlyfiles = [f for f in listdir(input_folder_path) if isfile(join(input_folder_path, f))]
str_len = []
for file_name in onlyfiles:
    file_path = input_folder_path + '/' + file_name
    final_path = final_folder_path + '/' + file_name
    sections = shortify_file(file_path)
    final_str = stringify(sections)
    print(final_str)
    print(len(final_str))
    str_len.append(len(final_str.split(' ')))
    with open(final_path, 'w', encoding='utf-8') as f:
        f.write(final_str)

print(sum(str_len) / len(str_len))


# for section_name, section_contents in sections.items():
#     print(section_name)
#     print(section_contents)
#     print('--------------------------')

