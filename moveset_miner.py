import requests
import json
import re
from urls_miner import get_max_links
import os




def extract_pokemon_data(text):
    sections = text.split('+----------------------------------------+')
    result = {}
    teammates = []
    moves = []
    abilities = []
    items = []
    spreads = []
    
    index = 0
    index_section = 0  #para el primer caso
    section_name = ""
    for section in sections:
        index += 1
        index_section += 1
        section_lines = section.strip().split('\n')
        section_name = section_lines[0]
        if index_section == 3:
            pass
        elif index == 3 or index_section == 2:
            pokemon_name =  section_lines[0]
            pokemon_name = pokemon_name.strip('|').strip()
            result[pokemon_name] = {'Name': pokemon_name}
            
        if "Moves" in section_name:
            for i in range(1, len(section_lines)):
                move = section_lines[i]
                name = re.search("[A-Za-z\s-]+\s", move).group()
                name = re.sub(r'\s+$', '', name)
                name = name.lstrip(' ')
                weight = re.search(r'\d+\.\d+%', move).group()
                weight = float(weight[:-1])  # remove the '%' and convert to float
                moves.append({'Name': name, 'Weight': weight})



            # Ensure pokemon_name is a key in the result dictionary
            if pokemon_name not in result:
                result[pokemon_name] = {}

            result[pokemon_name]['Moves'] = moves
            moves = []


        if "Teammates" in section_name:
            for i in range(1, len(section_lines)):
                teammate = section_lines[i]
                name = re.search("[A-Za-z-\s\d\d%'’:♂♀]+\s", teammate).group()
                name = re.sub(r'\s+$', '', name)
                name = name.lstrip(' ')

                weight = re.search(r'\d+\.\d+%', teammate).group()
                weight = float(weight[:-1])  # remove the '%' and convert to float
                teammates.append({'Name': name, 'Weight': weight})
            # Ensure pokemon_name is a key in the result dictionary
            if pokemon_name not in result:
                result[pokemon_name] = {}

            result[pokemon_name]['Teammates'] = teammates
            teammates = []
  

        if "Abilities" in section_name:
            for i in range(1, len(section_lines)):
                ability = section_lines[i]
                name = re.search("[A-Za-z\s-]+\s", ability).group()
                name = re.sub(r'\s+$', '', name)
                name = name.lstrip(' ')
                weight = re.search(r'\d+\.\d+%', ability).group()
                weight = float(weight[:-1])  # remove the '%' and convert to float
                abilities.append({'Name': name, 'Weight': weight})

            # Ensure pokemon_name is a key in the result dictionary
            if pokemon_name not in result:
                result[pokemon_name] = {}

            result[pokemon_name]['Abilities'] = abilities
            abilities = []

        if "Items" in section_name:
            for i in range(1, len(section_lines)):
                item = section_lines[i]
                name = re.search("[A-Za-z-\s\d\d%'’:♂♀]+\s", item).group()
                name = re.sub(r'\s+$', '', name)
                name = name.lstrip(' ')
                weight = re.search(r'\d+\.\d+%', item).group()
                weight = float(weight[:-1])  # remove the '%' and convert to float
                items.append({'Name': name, 'Weight': weight})

            # Ensure pokemon_name is a key in the result dictionary
            if pokemon_name not in result:
                result[pokemon_name] = {}

            result[pokemon_name]['Items'] = items
            items = []

        if "Spreads" in section_name:
            for i in range(1, len(section_lines)):
                spread = section_lines[i]
                spread = spread.strip('|').strip()
                name = spread.strip('|').split()[0]
                name = re.sub(r'\s+$', '', name)
                name = name.lstrip(' ')
                weight = float(re.search(r'\d+\.\d+', spread).group())
                spreads.append({'Name': name, 'Weight': weight})
            
            if pokemon_name not in result:
                result[pokemon_name] = {}
            
            result[pokemon_name]['Spreads'] = spreads
            spreads = []

        if "Checks and Counters" in section_name:
            index_section = 0
            pass

    return result


'''
response = requests.get("https://www.smogon.com/stats/2022-07/moveset/gen8ubers-1760.txt")

# Ensure the request was successful
response.raise_for_status()

# Get the text content of the response
input_text = response.text

# Now pass this text content to your function
#result = extract_pokemon_data(input_text)
result_one = extract_pokemon_data(input_text)

# Print the result
#print(result)
print(result_one)
'''
urldate = "2022-07"
url_for_function = "https://www.smogon.com/stats/" + urldate + "/moveset"
urlnames = get_max_links(url_for_function)

for urlname in urlnames:
    url = "https://www.smogon.com/stats/" + urldate + "/moveset/" + urlname
    response = requests.get(url)

    # The text content of the response is in response.text
    input_text = response.text
    lines = input_text.strip().split('\n')

    # Ensure the directory exists
    directory = os.path.join('movesets_data', urldate)
    os.makedirs(directory, exist_ok=True)
    format = urlname.split('-')[0]
    with open(f'{directory}/{format}.json', 'w', newline='') as jsonfile:
        result = extract_pokemon_data(input_text)
        json.dump(result, jsonfile, indent=4)
print("Done!")
