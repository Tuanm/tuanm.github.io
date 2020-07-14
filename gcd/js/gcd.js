console.log("%cDo Minh Tuan", "font-family: Consolas; font-size: 16px; color: yellow;");

/** @author Do Minh Tuan*/

var h = document.getElementById("h");
var a = document.getElementById("a");
var b = document.getElementById("b");
var result = document.getElementById("result");

h.onclick = function() {
	document.getElementById("a").style.fontSize = "36px";
	document.getElementById("b").style.fontSize = "36px";
	getResult();
};

h.onmouseleave = function() {
	document.getElementById("h").style.color = "#000";
	document.getElementById("a").style.fontSize = "24px";
	document.getElementById("b").style.fontSize = "24px";
};

h.onmouseover = function() {
	document.getElementById("h").style.color = "#333";
	document.getElementById("h").title = "Greatest Common Divisor";
};

a.onkeyup = function() {
	document.getElementById("a").style.fontSize = "36px";
	getResult();
};

a.onmouseleave = function() {
	document.getElementById("a").style.fontSize = "24px";
};

a.onmouseover = function() {
	document.getElementById("a").style.fontSize = "36px";
	document.getElementById("b").style.fontSize = "24px";
};

b.onkeyup = function() {
	document.getElementById("b").style.fontSize = "36px";
	getResult();
};

b.onmouseleave = function() {
	document.getElementById("b").style.fontSize = "24px";
};

b.onmouseover = function() {
	document.getElementById("b").style.fontSize = "36px";
	document.getElementById("a").style.fontSize = "24px";
};


result.onmouseover = function() {
	a = document.getElementById("a").value;
	b = document.getElementById("b").value;
	if (!isNaN(Number(a)) && !isNaN(parseInt(a)) && !isNaN(Number(b)) && !isNaN(parseInt(b))) {
		a = parseInt(a);
		b = parseInt(b);
		document.getElementById("result").style.color = "#333";
		if (a == 0 && b == 0) {
			document.getElementById("result").innerHTML = "Infinity";
		}
	}
};

result.onmouseleave = function() {
	getResult();
	document.getElementById("result").style.color = "#000";
};

function gcd(a, b) {
	if (b == 0) {
		return a;
	}
	else {
		return gcd(b, a % b);
	}
}

function getResult() {
	a = document.getElementById("a").value;
	b = document.getElementById("b").value;
	if (!isNaN(Number(a)) && !isNaN(parseInt(a)) && !isNaN(Number(b)) && !isNaN(parseInt(b))) {
		a = parseInt(a);
		b = parseInt(b);
		document.getElementById("result").innerHTML = gcd(a < 0 ? -a : a, b < 0 ? -b : b) || "?";
		document.getElementById("result").style.display = "inline";
	}
	else {
		document.getElementById("result").style.display = "none";
	}
}

var t = setInterval(function() {
	document.getElementById("result").style.display = "none";
}, 5000);
