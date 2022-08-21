const SOURCE_PATH = window.location.origin + window.location.pathname + 'data.json';

function generateLink(index, url, title, author = '') {
    if (!url) {
        index = '-';
        title = '#';
    } else if (!title) {
        title = url;
    }
    const span = document.createElement('span');
    span.textContent = index;
    const div = document.createElement('div');
    div.appendChild(span);
    const a = document.createElement('a');
    a.href = url;
    a.innerText = title;
    a.title = author;
    a.target = '_blank';
    const subDiv = document.createElement('div');
    subDiv.appendChild(a);
    div.appendChild(subDiv);
    return div;
}

async function loadData() {
    const container = document.getElementById('container');
    const data = await (await fetch(SOURCE_PATH)).json() || [];
    for (let index = 0; index < data.length; index++) {
        const { url, title, author } = data[index];
        const link = generateLink(index + 1, url, title, author);
        container.appendChild(link);
    }
    return data;
}

loadData().then((data) => {
    console.log('Data loaded.\n', data);
}).catch((err) => {
    console.log('Whoops! Something went wrong.\n', err?.message);
});