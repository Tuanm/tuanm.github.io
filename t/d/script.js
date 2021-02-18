var t = [
  {
    markAs: "Sunday",
    detail: [],
  },
  {
    markAs: "Monday",
    detail: [
      {
        week: [7, 8, 9, 11, 12, 13, 14, 15, 16, 17],
        time: "0645-0910",
        room: "B1-201",
        subject: "Introduction to Computer Science",
        id: "699153",
      },
      {
        week: [2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18],
        time: "1400-1500",
        room: "SVD",
        subject: "Basketball I",
        id: "638051",
      },
      {
        week: [2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18],
        time: "1530-1630",
        room: "SanKTX",
        subject: "Football I",
        id: "637892",
      },
    ],
  },
  {
    markAs: "Tuesday",
    detail: [
      {
        week: [2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18],
        time: "0645-0910",
        room: "D6-208",
        subject: "Probability and Statistics",
        id: "118373",
      },
      {
        week: [2, 4, 6, 8, 12, 14, 16, 18],
        time: "1505-1730",
        room: "D35-301",
        subject: "Political Economics of Marxism and Leninism",
        id: "120227",
      },
      {
        week: [3, 5, 7, 9, 11, 13, 15, 17],
        time: "1600-1645",
        room: "D35-301",
        subject: "Political Economics of Marxism and Leninism",
        id: "120229",
      },
    ],
  },
  {
    markAs: "Wednesday",
    detail: [
      {
        week: [2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18],
        time: "0645-0815",
        room: "D6-208",
        subject: "Probability and Statistics",
        id: "118373",
      },
      {
        week: [2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18],
        time: "1230-1455",
        room: "D6-208",
        subject: "Physics I",
        id: "118375",
      },
      {
        week: [2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18],
        time: "1505-1730",
        room: "D6-208",
        subject: "Introduction to Computer Science",
        id: "118374",
      },
    ],
  },
  {
    markAs: "Thursday",
    detail: [
      {
        week: [7, 8, 9],
        time: "0730-1130",
        room: "D3-502",
        subject: "Physics II",
        id: "698387",
      },
      {
        week: [2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18],
        time: "1230-1400",
        room: "D8-201",
        subject: "Technical Drawing I",
        id: "118379",
      },
      {
        week: [2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18],
        time: "1410-1550",
        room: "D8-302",
        subject: "Physics II",
        id: "118376",
      },
    ],
  },
  {
    markAs: "Friday",
    detail: [],
  },
  {
    markAs: "Saturday",
    detail: [],
  },
];

console.log("latest big update: 2020/09/16");
alert("Contact TUAN for update!");

/* ONLY EDIT ABOVE STUFF*/









console.log("demo version");

var hasAlerted = false;
var safeStyle = "style=\"color: green;\"";
var notSafeStyle = "style=\"color: red;\"";
var normalStyle = "style=\"color: yellow;\"";
var notReadStyle = "style=\"color: white;\"";
var readStyle = "style=\"color: gray;\"";

function showDialog() {
  document.getElementById("main").style.display = "none";
  document.getElementById("dialog").style.display = "block";
}

function hideDialog() {
  document.getElementById("dialog").style.display = "none";
  document.getElementById("main").style.display = "block";
}


document.body.style.backgroundColor = "black";

function changeColor() {
  if (document.body.style.backgroundColor == "black") {
    document.body.style.backgroundColor = "pink";
    document.body.style.color = "black";
  }
  else {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
  }
}


function getWeek(d) {
  var today = new Date(d.getFullYear(), d.getMonth() == 0 ? 12 : d.getMonth() + 1, d.getDate());
  var startDay = new Date(2020, 9, 18);
  var startWeek = 2;
  var milliSecDiff = Math.abs(today - startDay);
  var diff = Math.ceil(milliSecDiff
                    / (1000 * 60 * 60 * 24 * 7)) - 1;
  return startWeek + diff;
}

var dialog = "";

function getNotif(d, day = "today") {
  if (day == "today") dialog = "";
  var week = getWeek(d);
  var hour = "" + d.getHours();
  var minute = "" + d.getMinutes();
  hour = hour.length == 2 ? hour : "0" + hour;
  minute = minute.length == 2 ? minute : "0" + minute;
  var time = "" + hour + minute;
  var detail = t[d.getDay()]["detail"];
  var subjects = detail.length;
  var notif = hour + ":" + minute;
  var tag = "<div " + normalStyle + ">";
  var notReadTag = "<div " + notReadStyle + ">";
  if (subjects == 0) {
    dialog = "No class " + (day == "today" ? "" : "from today to ") + day + ".<br><br>";
    notif = tag.replace(normalStyle, safeStyle) + notif + "<br></div>";
    notif += notReadTag + "No class today." + "<br></div>";
    if (!hasAlerted) {
      // alert("No class today.");
      // if (day == "today") showDialog();
      hasAlerted = true;
    }
    var tomorrow = new Date(d);
    tomorrow.setDate(tomorrow.getDate() + 1);
    dialog += "<br>Coming on <b>" + t[tomorrow.getDay()]["markAs"] + "</b>:<br><br>";
    getNotif(tomorrow, t[tomorrow.getDay()]["markAs"]);
  }
  else {
    notif = tag + notif + "<br></div>";
    for (var i = 0; i < subjects; i++) {
      if (!detail[i]["week"].includes(week)) continue;
      var startTime = detail[i]["time"].substring(0, 4);
      var endTime = detail[i]["time"].substring(5);
      dialog += "<b>" +
                startTime.substring(0, 2) + ":" + startTime.substring(2) + " - " +
                endTime.substring(0, 2) + ":" + endTime.substring(2) + "</b><br>" +
                detail[i]["room"] + "<br>" +
                detail[i]["subject"] + "<br><br>";
      if (time < startTime) {
        var tempTime = detail[i]["subject"] +
                       " in " + detail[i]["room"] +
                       " starts at " + startTime.substring(0, 2) + ":" +
                                       startTime.substring(2) + ".";
        var startHour = startTime.substring(0, 2);
        var startMinute = startTime.substring(2);
        if (startHour - hour <= 1 && Math.abs(startMinute - minute) <= 30) {
          notif += notReadTag + "Quickly, class " + tempTime + "<br></div>";
          notif = notif.replace(tag, tag.replace(normalStyle, notSafeStyle));
          // alert("Quickly, class " + tempTime);
        }
        else {
          notif += notReadTag + "Class " + tempTime + "<br></div>";
        }
      }
      else if (time >= startTime && time < endTime) {
        notif += notReadTag + "In class " + detail[i]["subject"] +
                              " in " + detail[i]["room"] +
                              " ending at " + endTime.substring(0, 2) + ":" +
                                               endTime.substring(2) + "." + "<br></div>";
      }
      else if (i == subjects - 1 && time >= endTime) {
        notif += notReadTag + "No more classes." + "<br></div>";
        if (day == "today") {
          var tomorrow = new Date(d);
          tomorrow.setDate(tomorrow.getDate() + 1);
          dialog += "<br>Coming on <b>" + t[tomorrow.getDay()]["markAs"] + "</b>:<br><br>";
          getNotif(tomorrow, t[tomorrow.getDay()]["markAs"]);
        }
        notif = notif.replace(tag, tag.replace(normalStyle, safeStyle));
      }
    }
  }
  document.getElementById("dialog").innerHTML = dialog;
  return notif;
}

function replaceAll(str, subStr, repStr) {
  while (str.includes(subStr)) {
    str = str.replace(subStr, repStr);
  }
  return str;
}

function clickToHide(element) {
  element.style.display = "none";
}

function showDetails() {
  if (document.getElementById("today").innerHTML.includes("week")) {
    document.getElementById("today").innerHTML = t[(new Date()).getDay()]["markAs"];
    return;
  }
  var week = getWeek(new Date());
  if (week % 10 == 1 && week != 11) week = week + "st";
  else if (week % 10 == 2 && week != 12) week = week + "nd";
  else if (week % 10 == 3 && week != 13) week = week + "rd";
  else week = week + "th";
  document.getElementById("today").innerHTML = week + " week ";
}

var updateTime = 0;

var justDoIt = function() {
  updateTime++;
  var d = new Date();
  document.getElementById("today").innerHTML = t[d.getDay()]["markAs"];
  var notif = "" + document.getElementById("notif").innerHTML;
  if (notif.length > 500 || updateTime == 3) {
    notif = "";
    document.getElementById("today").style.color = "gray";
    updateTime = 0;
  }
  var readATag = "<a " + readStyle + ">";
  var hidable = "onclick=\"clickToHide(this)\"";
  var hidableTag = "<div ondblclick=\"clickToHide(this)\">";
  document.getElementById("notif").innerHTML = "<div>" + hidableTag +
                                               replaceAll(
                                                 replaceAll(
                                                   replaceAll(
                                                     replaceAll(notif, normalStyle, readStyle + hidable),
                                                     notSafeStyle,
                                                     readStyle + hidable
                                                   ),
                                                   safeStyle,
                                                   readStyle + hidable
                                                 ),
                                                 notReadStyle,
                                                 readStyle + hidable
                                               ) +
                                               "</div>"+ getNotif(d) + "</div>";
  // window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
};

setTimeout(function() {
  document.getElementById("today").style.marginTop = "2em";
  document.getElementById("today").style.fontSize = "300%";
  document.getElementById("today").innerHTML = t[(new Date()).getDay()]["markAs"];
  setTimeout(justDoIt, 1000);
}, 1500);

setInterval(function() {
  location.reload();
}, 900000);

var timeToUpdate = 60000; // :))

setInterval(justDoIt, timeToUpdate);
