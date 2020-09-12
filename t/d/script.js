var t = [
  {
    markAs: "Sunday",
    detail: [],
  },
  {
    markAs: "Monday",
    detail: [
      {
        time: "1230-1550",
        room: "D6-405",
        subject: "Computer Architectures",
        id: "118185",
      },
      {
        time: "1600-1730",
        room: "D6-405",
        subject: "Object-Oriented Programming",
        id: "118181",
      },
    ],
  },
  {
    markAs: "Tuesday",
    detail: [],
  },
  {
    markAs: "Wednesday",
    detail: [
      {
        time: "1230-1455",
        room: "D6-403",
        subject: "Mathematical Statistics",
        id: "118183",
      },
      {
        time: "1505-1730",
        room: "D6-403",
        subject: "Operating Systems",
        id: "118182",
      },
    ],
  },
  {
    markAs: "Thursday",
    detail: [
      {
        time: "1230-1400",
        room: "D6-405",
        subject: "Object-Oriented Programming",
        id: "118181",
      },
      {
        time: "1410-1730",
        room: "D6-405",
        subject: "Data Structures and Algorithms",
        id: "118184",
      },
    ],
  },
  {
    markAs: "Friday",
    detail: [
      {
        time: "1230-1550",
        room: "D6-403",
        subject: "Computation Programming",
        id: "118186",
      },
    ],
  },
  {
    markAs: "Saturday",
    detail: [],
  },
];


/* ONLY EDIT ABOVE STUFF*/










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

var dialog = "";

function getNotif(d, day = "today") {
  if (day == "today") dialog = "";
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
    dialog += "Coming on <b>" + t[tomorrow.getDay()]["markAs"] + "</b>:<br>";
    getNotif(tomorrow, t[tomorrow.getDay()]["markAs"]);

  }
  else {
    notif = tag + notif + "<br></div>";
    for (var i = 0; i < subjects; i++) {
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

console.log("demo version");
console.log("2020/09");