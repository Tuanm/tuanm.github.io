var greetings = document.getElementById("greetings");
var image = document.getElementById("image");


greetings.onclick = () => {

  if (greetings.innerHTML == "open") {
  	image.style.display = "flex";
  	greetings.innerHTML = "close";
  }
  else {
    image.style.display = "none";
    greetings.innerHTML = "open";
  }

  window.location.href = "#image";
};


var hide = (id) => {
  document.getElementById(id).style.display = "none";
};


var show = (id) => {
  document.getElementById(id).style.display = "block";
};