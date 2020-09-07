console.log("demo version - last update: 2020/09/03");

function show(id) {
  document.getElementById("content-" + id.toString()).style.display = "block";
  document.getElementById("title-" + id.toString()).style.display = "none";
}

function hide(id) {
  document.getElementById("content-" + id.toString()).style.display = "none";
  document.getElementById("title-" + id.toString()).style.display = "block";
}


let subjects = [];
let GPA = 0;


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
let submit3 = document.getElementById("submit-3");
let submit4 = document.getElementById("submit-4");

function showStatus(content) {
  let status = document.getElementById("status");
  if (status.innerHTML == "") status.innerHTML = content;
  window.location.href = "#o_o";
  setTimeout(clearStatus, 2500);
}

function clearStatus() {
  let status = document.getElementById("status");
  status.innerHTML = "";
}

submit1.onclick = function() {

  hide(2);
  hide(3);
  hide(4);

  addSubject();
  display(0);
};

submit2.onclick = function() {

  hide(1);
  hide(3);
  hide(4);

  if (subjects.length == 0) {
  	console.log("Chưa có môn học nào. Cần thêm môn học để xoá.");
  	showStatus("chưa có môn học nào");
  	return;
  }

  deleteSubject();
  display(0);
};

submit3.onclick = function() {

  hide(1);
  hide(2);
  hide(4);

  if (subjects.length == 0) {
  	console.log("Chưa có môn học nào. Cần thêm môn học để tính điểm.");
  	showStatus("chưa có môn học nào");
  	return;
  }

  GPA = Math.round(100 * creditPoints / credits) / 100;
  document.getElementById("gpa").innerHTML = GPA;
  document.getElementById("credits").innerHTML = credits;
}

submit4.onclick = function() {

  hide(1);
  hide(2);
  hide(3);

  let lastCredits = document.getElementById("cpa-credits-4").value;
  let lastCPA = document.getElementById("cpa-4").value;
  let currentGPA = document.getElementById("gpa-4").value;
  let currentCredits = document.getElementById("credits-4").value;

  if (lastCPA == "" || lastCredits == "") {
  	console.log("Đã có lỗi xảy ra. Vui lòng kiểm tra lại.");
  	showStatus("có lỗi xảy ra");
  	return;
  }

  lastCPA = Number(lastCPA);
  lastCredits = Number(lastCredits);

  if (currentGPA == "") currentGPA = GPA;
  else currentGPA = Number(currentGPA);

  if (currentCredits == "") currentCredits = credits;
  else currentCredits = Number(currentCredits);

  let CPA = Math.round(100 * (lastCPA * lastCredits + currentGPA)
  	                       / (lastCredits + currentCredits)) / 100;

  if (isNaN(CPA)) {
  	return;
  }

  document.getElementById("cpa").innerHTML = CPA;
}


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


function getConversePoint(rank) {

  switch (rank) {
    case "A+":
    case "A": return 4;
    case "B+": return 3.5;
    case "B": return 3;
    case "C+": return 2.5;
    case "C": return 2;
    case "D+": return 1.5;
    case "D": return 1;
  }

  return 0;
}


function getSubject() {

  let subject = {
	name: "?",
    credit: 0.0,
    middleRate: 0.0,
    middlePoint: 0.0,
    endPoint: 0.0,
    point: 0.0,
    rank: "F",
    conversePoint: 0.0
  };

  subject.name = document.getElementById("subject-name").value;
  subject.credit = Number(document.getElementById("subject-credit").value);
  subject.middleRate = document.getElementById("subject-middle-rate").value;
  subject.middlePoint = document.getElementById("subject-middle-point").value;
  subject.endPoint = document.getElementById("subject-end-point").value;

  subject.point = Math.round((subject.middlePoint * subject.middleRate
                            + subject.endPoint * (1 - subject.middleRate)) * 10) / 10;
  subject.rank = getSubjectRank(subject.point);
  if (subject.middleRate != 0) {
  	if (subject.middlePoint < 3 || subject.endPoint < 3) subject.rank = "F";
  }

  subject.conversePoint = getConversePoint(subject.rank);

  return subject;
}


function checkSubject(subject) {

  if (subject.name < 1)
  	return false;
  if (subject.credit < 0 || isNaN(subject.credit))
  	return false;
  if (subject.middleRate < 0 || subject.middleRate > 1 || isNaN(subject.middleRate))
  	return false;
  if (subject.middlePoint < 0 || subject.middlePoint > 10 || isNaN(subject.middlePoint))
  	return false;
  if (subject.endPoint < 0 || subject.endPoint > 10 || isNaN(subject.endPoint))
  	return false;

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


let credits = 0;
let creditPoints = 0

function addSubject() {

  let subject = getSubject();

  if (!checkSubject(subject)) {
  	console.log("Đã có lỗi xảy ra. Vui lòng kiểm tra lại.");
  	showStatus("có lỗi xảy ra");
  	return;
  }

  let index = checkSubmit();

  if (index != -1) {
  	credits = credits - subjects[index].credit + subject.credit;
  	creditPoints = creditPoints
  	             - subjects[index].credit * subjects[index].conversePoint
  	             + subject.credit * subject.conversePoint;
    subjects[index] = subject;
    console.log("Đã sửa " + subject.name + ".");
    showStatus("đã sửa " + subject.name);
    console.table(subjects);
  }
  else {
  	credits += subject.credit;
  	creditPoints += subject.credit * subject.conversePoint;
  	subjects.push(subject);
    console.log("Đã thêm " + subject.name + ".");
    showStatus("đã thêm " + subject.name);
    console.table(subjects);
  }
}


function deleteSubject() {

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
    credits = credits - subjects[index].credit;
    creditPoints = creditPoints
                 - subjects[index].credit * subjects[index].conversePoint;
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


function deleteSubjectById(index) {
  console.log("Đã xoá " + subjects[index].name + ".");
  showStatus("đã xoá " + subjects[index].name);
  credits = credits - subjects[index].credit;
  creditPoints = creditPoints
               - subjects[index].credit * subjects[index].conversePoint;
  subjects.splice(index, 1);
  console.table(subjects);
  display(0);
}


let table = document.getElementById("table");

function display(id) {

  show(id);

  if (subjects.length == 0) {
  	table.innerHTML = "o_o";
  	return;
  }

  const TR = "<tr>*</tr>";
  const TH = "<th>môn</th><th>số tín</th><th>điểm thi</th><th>điểm</th><th>xếp loại</th><th></th>"
  const TD = "<td>*</td>";

  table.innerHTML = TR.replace("*", TH);

  for (var i = 0; i < subjects.length; i++) {
  	let tr = "";
  	tr += TD.replace("*", subjects[i].name);
  	tr += TD.replace("*", subjects[i].credit);
  	tr += TD.replace("*",
  		    "<div title=\"điểm quá trình (*)\">*</div>".replace("*", subjects[i].middleRate)
                                                     .replace("*", subjects[i].middlePoint)
  	    + " "
  	    + "<div title=\"điểm kết thúc (*)\">*</div>".replace("*", 1 - subjects[i].middleRate)
                                                    .replace("*", subjects[i].endPoint));
  	tr += TD.replace("*", subjects[i].point);
  	tr += TD.replace("*", subjects[i].rank);
  	tr += TD.replace("*", "<div title=\"bấm để xoá\" "
  		                + "class=\"x-delete\""
  		                + "onclick=\"deleteSubjectById(#)\">x</div>")
  	        .replace("#", i);
  	table.innerHTML += TR.replace("*", tr);
  }
}


function reset(id) {

  hide(id);

  subjects = [];

  console.clear();
  console.log("Đã xoá danh sách môn học.");
  showStatus("đã xoá");
}