console.log("demo");

function show(id) {
  document.getElementById("content-" + id.toString()).style.display = "block";
  document.getElementById("title-" + id.toString()).style.display = "none";
}

function hide(id) {
  document.getElementById("content-" + id.toString()).style.display = "none";
  document.getElementById("title-" + id.toString()).style.display = "block";
}


let subjects = [];


subjects.includes = function(subject) {

  for (var i = 0; i < subjects.length; i++) {
  	if (subject.name === subjects[i].name) return true;
  }

  return false;
}


subjects.indexOf = function(subject) {

  for (var i = 0; i < subjects.length; i++) {
  	if (subject.name == subjects[i].name) return i;
  }

  return -1;
}


let submit1 = document.getElementById("submit-1");
let submit2 = document.getElementById("submit-2");

function showStatus(content) {
  let status = document.getElementById("status");
  status.innerHTML = content;
  window.location.href = "#top";
  setTimeout(clearStatus, 5000);
}

function clearStatus() {
  let status = document.getElementById("status");
  status.innerHTML = "";
}

submit1.onclick = function() {
  addSubject();
};

submit2.onclick = function() {
  removeSubject();
};


function getSubjectRank(point) {
  if (point >= 9.5) return "A+";
  if (point >= 8.5) return "A";
  if (point >= 8) return "B+";
  if (point >= 7) return "B";
  if (point >= 6) return "C+";
  if (point >= 5.5) return "C";
  if (point >= 5) return "D+";
  if (point >= 4) return "D";
  return "F";
}


function getSubject() {

  let subject = {
	name: "?",
    credit: 0,
    middleRate: 0.0,
    middlePoint: 0.0,
    endPoint: 0.0,
    point: 0.0,
    rank: "F"
  };

  subject.name = document.getElementById("subject-name").value;
  subject.credit = document.getElementById("subject-credit").value;
  subject.middleRate = document.getElementById("subject-middle-rate").value;
  subject.middlePoint = document.getElementById("subject-middle-point").value;
  subject.endPoint = document.getElementById("subject-end-point").value;

  subject.point = Math.round((subject.middlePoint * subject.middleRate
                            + subject.endPoint * (1 - subject.middleRate)) * 10) / 10;
  subject.rank = getSubjectRank(subject.point);
  if (subject.middleRate != 0) {
  	if (subject.middlePoint < 3 || subject.endPoint < 3) subject.rank = "F";
  }

  return subject;
}


function checkSubject(subject) {

  if (subject.name < 1) return false;
  if (subject.credit < 0) return false;
  if (subject.middleRate < 0 || subject.middleRate > 1) return false;
  if (subject.middlePoint < 0 || subject.middlePoint > 10) return false;
  if (subject.endPoint < 0 || subject.endPoint > 10) return false;

  return true;
}


function checkSubmit() {

  let subject = {
	name: "",
    credit: 0,
    middleRate: 0.0,
    middlePoint: 0.0,
    endPoint: 0.0
  };

  subject.name = document.getElementById("subject-name").value;

  let index = subjects.indexOf(subject);

  if (index != -1) {
  	submit1.innerHTML = "sửa";
  	return index;
  }

  submit1.innerHTML = "thêm";
  return -1;
}


let content1 = document.getElementById("content-1");

content1.onkeyup = function() {
	checkSubmit();
};


function addSubject() {

  let subject = getSubject();

  if (!checkSubject(subject)) {
  	console.log("Đã có lỗi gì đó xảy ra. Vui lòng kiểm tra lại.");
  	showStatus("đã có lỗi gì đó xảy ra");
  	return;
  }

  let index = checkSubmit();

  if (index != -1) {
    subjects[index] = subject;
    console.log("Đã sửa " + subject.name + ".");
    showStatus("đã sửa " + subject.name);
    console.table(subjects);
  }
  else {
  	subjects.push(subject);
    console.log("Đã thêm " + subject.name + ".");
    showStatus("đã thêm " + subject.name);
    console.table(subjects);
  }
}


function removeSubject() {

  let subject = {
	name: "",
    credit: 0,
    middleRate: 0.0,
    middlePoint: 0.0,
    endPoint: 0.0
  };

  subject.name = document.getElementById("subject-name-2").value;

  let index = subjects.indexOf(subject);
  if (index != -1) {
  	subjects.splice(index, 1);
  	console.log("Đã xoá " + subject.name + ".");
  	showStatus("đã xoá " + subject.name);
  	console.table(subjects);
  }
  else {
  	console.log("Không tìm thấy " + subject.name + ".");
  	showStatus("không tìm thấy " + subject.name);
  }
}
