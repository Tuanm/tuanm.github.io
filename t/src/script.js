let root = document.getElementById('root');

var data = loadData();
updateContainer();


/* CREATE TABLE ELEMENTS */

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
        updateContainer();
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
            updateContainer();
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
    array.forEach(element => {
        tbody.appendChild(createTR(element));
    });
    return tbody;
};

function createTable(data) {
    let table = document.createElement('table');
    table.appendChild(createTHead());
    table.appendChild(createTBody(data));
    return table;
}



/* SET CONTAINER DRAGGABLE */

function createContainer() {
    let draggable = document.createElement('div');
    draggable.id = draggable.className = "draggable";
    draggable.innerHTML = "#";
    var table = createTable(data);
    table.id = "table";
    let button = document.createElement('button');
    button.innerHTML = `<span>Save</span>`;
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
    var container = document.getElementById('container');
    if (container) {
        root.removeChild(container);
    }
    root.appendChild(createContainer());
}



/* DATA LOAD AND STORE */

function loadData() {
    let data = JSON.parse(localStorage.getItem('data'));
    console.log("Data loaded.");
    return data;
}

function storeData() {
    localStorage.setItem('data', JSON.stringify(data));
    console.log("Data stored.");
}






