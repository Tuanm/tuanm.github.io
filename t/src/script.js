let root = document.getElementById('root');

const days = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday", "None",
];

var data = loadData();
updateContainer();




/* CREATE TABLE ELEMENTS */

// function createSelect() {
//     let select = document.createElement('select');
//     days.forEach((day) => {
//         let option = document.createElement('option');
//         option.textContent = day;
//         select.appendChild(option);
//     });
//     return select;
// }

function insertAfter(newChild, refChild) {
    refChild.parentNode.insertBefore(newChild, refChild.nextSibling);
}

function createTHead() {
    function createTH(content, className) {
        let th = document.createElement('th');
        th.textContent = content;
        th.className = className;
        return th;
    };

    let day = createTH("Day", "noselect");
    let time = createTH("Time", "noselect");
    let subject = createTH("Subject", "noselect");
    let room = createTH("Room", "noselect");
    let more = createTH("➕", "clickable");
    more.onclick = () => {
        data.push({
            day: "Sunday",
            startTime: "00:00",
            endTime: "23:59",
            subject: "None",
            room: "Home",
        });
        // updateContainer();
        updateTable();
    };
    
    let tr = document.createElement('tr');
    tr.appendChild(day);
    tr.appendChild(time);
    tr.appendChild(subject);
    tr.appendChild(room);
    tr.appendChild(more);

    let thead = document.createElement('thead');
    thead.appendChild(tr);
    return thead;
};

function createTBody(array) {
    function createTR(element) {
        function createTD(content, isContentEditable) {
            let td = document.createElement('td');
            td.contentEditable = isContentEditable;
            td.textContent = content;
            return td;
        };

        let day = createTD(element.day, true);
        let startTime = createTD(element.startTime, true);
        let endTime = createTD(element.endTime, true);
        let time = createTD("", false);
        let remove = createTD("✕", false);
        remove.className = "clickable";
        remove.onclick = () => {
            var index = data.indexOf(element);
            if (index != -1) {
                data.splice(index, 1);
            }
            // updateContainer();
            updateTable();
        };
        time.appendChild(startTime);
        time.appendChild(createTD("-", false));
        time.appendChild(endTime);
        let subject = createTD(element.subject, true);
        let room = createTD(element.room, true);
        let tr = document.createElement('tr');
        tr.appendChild(day);
        tr.appendChild(time);
        tr.appendChild(subject);
        tr.appendChild(room);
        tr.appendChild(remove);
        return tr;
    };

    let tbody = document.createElement('tbody');
    tbody.id = "tbody";
    array.forEach(element => {
        tbody.appendChild(createTR(element));
    });
    return tbody;
};

function createTable(data) {
    let table = document.createElement('table');
    table.id = "table";
    table.appendChild(createTHead());
    table.appendChild(createTBody(data));
    return table;
}

function updateTable() {
    let container = document.getElementById('container');
    let table = document.getElementById('table');
    container.removeChild(table);
    insertAfter(
        createTable(data),
        document.getElementById('draggable')
    );
}



/* SET CONTAINER DRAGGABLE */

function createContainer() {
    let draggable = document.createElement('div');
    draggable.id = draggable.className = "draggable";
    draggable.innerHTML = "#";
    let table = createTable(data);
    let button = document.createElement('button');
    button.innerHTML = `<span>SAVE</span>`;
    button.onclick = () => {
        storeData();
    };
    let container = document.createElement('div');
    container.id = container.className = "container";
    container.appendChild(draggable);
    container.appendChild(table);
    container.appendChild(button);
    root.appendChild(container);
    dragElement(container);
    return container;
}

/* Copied from W3schools */
function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    document.getElementById('draggable').onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function updateContainer() {
    let container = document.getElementById('container');
    if (container) {
        root.removeChild(container);
    }
    root.appendChild(createContainer());
}



/* REQUEST NOTIFICATIONS */

document.addEventListener('DOMContentLoaded', function() {
    if (!Notification) {
        alert('Desktop notifications not available in your browser. Try Chromium.');
        return;
    }

    if (Notification.permission !== 'granted')
        Notification.requestPermission();
});



/* DATA LOAD AND STORE */

function loadData() {
    let data = JSON.parse(localStorage.getItem('data'));
    if (!data || !data.content) {
        data = {
            date: new Date().toString().substr(0, 24),
            content: [
                {
                    day: "Sunday",
                    startTime: "00:00",
                    endTime: "23:59",
                    subject: "None",
                    room: "Home",
                },
            ],
        };
    }
    let title = "Data loaded from local storage.";
    let content = data.date;
    new Notification(title, { body: content });
    console.log(title);
    return data.content;
}

function storeData() {
    data = getDataFromTable();
    let date = new Date().toString().substr(0, 24);
    let raw = JSON.stringify({
        date: date,
        content: data,
    });
    localStorage.setItem('data', raw);
    let title = "Data stored in local storage.";
    let content = date;
    new Notification(title, { body: content });
    console.log(title);
}

function getDataFromTable() {
    let tbody = document.getElementById('tbody');
    let data = [];
    tbody.childNodes.forEach((tr) => {
        var tds = tr.childNodes;
        var day = tds[0].textContent;
        if (!days.includes(day)) {
            day = "None";
            updateTable();
        }
        var startTime = tds[1].childNodes[0].textContent;
        var endTime = tds[1].childNodes[2].textContent;
        var subject = tds[2].textContent;
        var room = tds[3].textContent;
        var element = {
            day: day,
            startTime: startTime,
            endTime: endTime,
            subject: subject,
            room: room,
        };
        data.push(element);
    });
    return data;
}



/* Date filtering */

function showOnlyToday() {
    tbody.childNodes.forEach((tr) => {
        var tds = tr.childNodes;
        var day = tds[0].textContent;
        if (day !== days[new Date().getDay()]) {
            tr.hidden = !tr.hidden;
        }
    });
}


let filterButton = document.createElement('button');
filterButton.innerHTML = "<span>TODAY</span>";
filterButton.onclick = showOnlyToday;
root.appendChild(filterButton);



/* Pop-up */

function showPopup(text) {
    let overlay = document.createElement('button');
    overlay.className = "overlay";
    overlay.innerHTML = `<span>${text}</span>`;
    root.insertBefore(overlay, document.getElementById('container'));
    setTimeout(() => {
        root.removeChild(overlay);
    }, 3000);
}