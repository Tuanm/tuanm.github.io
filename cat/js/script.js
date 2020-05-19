console.clear();
console.log('%c# cat & mouse', 'font-family: Consolas; font-size: 16px; color: #66ff99;');
console.log('A Pen created on CodePen.io. Original URL:');
console.log('https://codepen.io/louflan/pen/LYpggXQ');

var pupil = document.getElementsByClassName("pupil");
document.onmousemove = function () {
	var x = (event.clientX * 8) / window.innerWidth + "%";
	var y = (event.clientY * 8) / window.innerHeight + "%";

	for (var i = 0; i < 2; i++) {
		pupil[i].style.left = x;
		pupil[i].style.top = y;
		pupil[i].style.transform = "translate(" + x + "," + y + ")";
	}
};
