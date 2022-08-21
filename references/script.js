const SOURCE_PATH = window.location.href + 'data.json';

function generateLink(index = '-', url = '#', title = '#', author = '') {
    const a = document.createElement('a');
    a.href = url;
    a.innerText = title;
    a.title = author;
    a.target = '_blank';
    const div = document.createElement('div');
    div.innerHTML = index;
    div.appendChild(a);
    return div;
}

async function loadData() {
    const container = document.getElementById('container');
    const data = (await fetch(SOURCE_PATH)).body || [];
    for (let index = 0; index < data.length; index++) {
        const { url, title, author } = data[index];
        const link = generateLink(index + 1, url, title, author);
        container.appendChild(link);
    }
}

loadData();