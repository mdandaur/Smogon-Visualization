import requests
import csv
import os
from urls_miner import get_max_links

urldate = "2023-07"
url_for_function = "https://www.smogon.com/stats/" + urldate + "/"
urlnames = get_max_links(url_for_function)
print(urlnames)


for urlname in urlnames:
    url = "https://www.smogon.com/stats/" + urldate + "/" + urlname
    response = requests.get(url)

    # The text content of the response is in response.text
    input_text = response.text
    lines = input_text.strip().split('\n')

    # Ensure the directory exists
    directory = os.path.join('smogon_data', urldate)
    os.makedirs(directory, exist_ok=True)

    with open(os.path.join(directory, urlname), 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        
        # Write the header row
        header = ["Rank", "Pokemon", "Usage %", "Raw", "%", "Real", "%"]
        writer.writerow(header)
        
        # Loop through the lines starting from the 4th line (skipping header)
        for line in lines[5:-1]:
            # Skip lines that match the pattern
            if line.strip() == "+ ---- + ------------------ + --------- + ------ + ------- + ------ + ------- +":
                continue

            # Split the line by '|' and strip each item of leading/trailing whitespace
            data = [item.strip() for item in line.split('|')]
            # Remove empty strings from the list
            data = list(filter(None, data))
            # Write the data to the CSV file
            writer.writerow(data)