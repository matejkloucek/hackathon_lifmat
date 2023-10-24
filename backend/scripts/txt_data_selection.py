

folder_path = 'C:/Users/katka/Downloads/SPC_final'
file_name = 'SPC101234.txt'
final_file_path = 'C:/Users/katka/Downloads/SPC_cleaned'

final_path = folder_path + '/' + file_name

current_section = None
sections = {}
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

with open(final_path, 'r', encoding='utf-8') as file:
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
                # if '\n' in line:
                #     line = line.replace('\n', '')
                if line != '\n':
                    current_content.append(line)

    # Store the last chapter
    if current_section is not None:
        sections[current_section] = current_content

def stringify(sections):
    final_str = ''
    for section_name, section_contents in sections.items():
        final_str += section_name
        for element in section_contents:
            final_str += element

    print(final_str)

    with open(final_file_path, 'w', encoding='utf-8') as f:
        f.write(final_str)


# Print the contents of the second and fifth chapters
for section_name, section_contents in sections.items():
    print(section_name)
    print(section_contents)
    print('--------------------------')

stringify(sections)
