window.location.href = "#o_o";


const o_o = document.getElementById("o_o");


o_o.onclick = function() {
  let value = o_o.innerHTML;
  if (value === "o_o") o_o.innerHTML = ">_<";
  else o_o.innerHTML = "o_o";
};


function show(element) {
  element.style.display = "block";
}


function hide(element) {
  element.style.display = "none";
}


function scrollHeight(element = document.document.Element) {
  window.scrollTo(0, element.scrollHeight);
}