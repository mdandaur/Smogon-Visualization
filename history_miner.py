import requests
from bs4 import BeautifulSoup
from collections import defaultdict
import json
import re
import os

date = "2019-07"

url = "https://www.smogon.com/stats/2019-07/"  # Replace with your URL
def get_all_links(date):
    url = "https://www.smogon.com/stats/" + date + "/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    links = []
    for link in soup.find_all('a'):
        if link.get('href').startswith("gen"):
            links.append(link.get('href'))
    return links


urlnames = get_all_links(date)
def get_first_lines(urlnames, date):
    data = {'name': 'Generaciones', 'children': []}
    gen_format_data = {}
    for url in urlnames:
        gen_match = re.search(r'gen\d', url)
        gen = int(gen_match.group(0).replace('gen', ''))
        format_match = re.search(r'gen\d+\w+', url)
        format = format_match.group(0).replace(gen_match.group(0), '')
        print(url, "url")
        response = requests.get('https://www.smogon.com/stats/'+ date +'/'+ url)
        first_line = response.text.split('\n')[0]
        first_line = first_line.split(': ')[1].replace('\n', '')
        print(first_line, "value")

        key = f"Gen {gen}"
        print(gen_format_data, "gen_format_data")
        if (key not in gen_format_data):
            gen_format_data[key] = {'name': key, 'children': []}
                
        if not any(child['name'] == format for child in gen_format_data[key]['children']):
            gen_format_data[key]['children'].append({'name': format, 'value': first_line})
    for gen_format, children in gen_format_data.items():
        data['children'].append(children)



    directory = os.path.join('history_data', date)
    os.makedirs(directory, exist_ok=True)

    with open('history_data/'+date+'/first_lines.json', 'w') as f:
        json.dump(data, f, indent=4)

# Assuming urlnames is a list of URLs
urlnames = get_all_links(date)
get_first_lines(urlnames, date)        


