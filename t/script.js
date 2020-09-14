console.log("update: 2020/09/14");


window.location.href = "#greetings";


const IMAGE_SOURCE = "20201.png";

var greetings = document.getElementById("greetings");
var image = document.getElementById("image");
var back = document.getElementById("back");
var more = document.getElementById("more");


greetings.onclick = () => {

  if (greetings.innerHTML == "open") {
  	image.style.display = "flex";
  	greetings.innerHTML = "close";
  }
  else {
    image.style.display = "none";
    greetings.innerHTML = "open";
  }

  window.location.href = "#greetings";
};


image.ondblclick = () => {
  window.location.href = IMAGE_SOURCE;
};


back.onclick = () => {
  window.history.back();
};


more.onclick = () => {
  window.location.href = "https://tuanm.github.io/blog";
};


var hide = (id) => {
  document.getElementById(id).style.display = "none";
};


var show = (id) => {
  document.getElementById(id).style.display = "block";
};