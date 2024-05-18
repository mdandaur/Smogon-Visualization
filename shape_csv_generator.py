import requests
import json
import re
from urls_miner import get_max_links
import os
import csv



def extract_pokemon_data(text):
    sections = text.split('+----------------------------------------+')
    result = []
    
    index = 0
    index_section = 0  #para el primer caso
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
            result.append(pokemon_name)
        
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
urldate = "2023-07"
url_for_function = "https://www.smogon.com/stats/" + urldate + "/moveset"
urlnames = get_max_links(url_for_function)

for urlname in urlnames:

# Load the existing names from the CSV file
    existing_names = set()
    try:
        with open('shapes.csv', 'r') as f:
            reader = csv.reader(f)
            next(reader)  # skip the header
            for row in reader:
                existing_names.add(row[0])
    except FileNotFoundError:
        pass  # It's okay if the file doesn't exist yet 

    url = "https://www.smogon.com/stats/" + urldate + "/moveset/" + urlname
    response = requests.get(url)

    # The text content of the response is in response.text
    input_text = response.text
    lines = input_text.strip().split('\n')
    result = extract_pokemon_data(input_text)
    new_names = [name for name in result if name not in existing_names]
    print(new_names)
    with open('shapes.csv', 'a', newline='') as f:
        writer = csv.writer(f)
        if not existing_names:
            writer.writerow(['Pokemon'])  # write the header if the file was empty
        for name in new_names:
            writer.writerow([name])  # write each new name as a row


print("Done!")

