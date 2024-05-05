import requests
from bs4 import BeautifulSoup
from collections import defaultdict

url = "https://www.smogon.com/stats/2019-07/"  # Replace with your URL
def get_max_links(url):
    response = requests.get(url)
    html = response.text
    soup = BeautifulSoup(html, 'html.parser')

    links = [a['href'] for a in soup.find_all('a', href=True) if a['href'].endswith('.txt')]



    max_links_dict = {}
    for link in links:
        name, number = link.rsplit('-', 1)
        number = number.rsplit('.', 1)[0]  # remove .txt
        if name not in max_links_dict or int(number) > int(max_links_dict[name].rsplit('-', 1)[1].rsplit('.', 1)[0]):
            max_links_dict[name] = link

    max_links = list(max_links_dict.values())

    return max_links

urlnames = get_max_links(url)
print(urlnames)