import requests
from bs4 import BeautifulSoup
from collections import defaultdict

url = "https://www.smogon.com/stats/2019-07/"  # Replace with your URL
def get_max_links(url):
    response = requests.get(url)
    html = response.text
    soup = BeautifulSoup(html, 'html.parser')

    links = [a['href'] for a in soup.find_all('a', href=True)]

    substrings = ["gen1ou-", "gen2ou-", "gen3ou-", "gen4ou-", "gen5ou-", "gen6ou-", "gen7ou-", "gen8ou-",
                  "gen1uu-", "gen2uu-", "gen3uu-", "gen4uu-", "gen5uu-", "gen6uu-", "gen7uu-", "gen8uu-",
                  "gen1ru-", "gen2ru-", "gen3ru-", "gen4ru-", "gen5ru-", "gen6ru-", "gen7ru-", "gen8ru-",
                  "gen1nu-", "gen2nu-", "gen3nu-", "gen4nu-", "gen5nu-", "gen6nu-", "gen7nu-", "gen8nu-",
                  "gen1ubers-", "gen2ubers-", "gen3ubers-", "gen4ubers-", "gen5ubers-", "gen6ubers-", "gen7ubers-", "gen8ubers-"]

    links_by_substring = defaultdict(list)
    for link in links:
        for substring in substrings:
            if substring in link:
                links_by_substring[substring].append(link)

    max_links = []
    for substring, links in links_by_substring.items():
        max_links.append(max(links, key=lambda link: int(link.split('-')[-1].split('.')[0])))

    return max_links
