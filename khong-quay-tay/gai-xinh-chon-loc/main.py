import re
import get
import requests

def download(id = 0):
    urls = get.get()
    for url in urls:
        extension = re.search(r'(jpg|gif|png|jpeg)$', url)
        filename = './img/' + str(id) + '.' + extension.group(1)
        with open(filename, 'wb') as f:
            response = requests.get(url)
            f.write(response.content)
            print(filename, ' --- downloaded')
            id += 1

if __name__ == '__main__':
    id = int(input('First image identity: '))
    id = id if id > 0 else 0
    download(id)