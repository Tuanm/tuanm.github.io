import re
import requests
from bs4 import BeautifulSoup

site = 'https://gaixinhchonloc.com/'

response = requests.get(site)
soup = BeautifulSoup(response.text, 'html.parser')

div_tags = soup.find_all('div')

def get():
    urls = []
    for div in div_tags:
        str_div = str(div)
        if 'data-photo-high="' in str_div:
            str_div = str_div[str_div.find('data-photo-high="') + 17:]
            str_div = str_div[:str_div.find('.jpg')] + '.jpg'
            url = str_div
            if url is None: continue
            urls += [url]
    return urls

def main():
    urls = get()

if __name__ == '__main__':
    main()