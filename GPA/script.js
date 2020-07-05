console.log("Đã có cái mẹ gì đâu -_-");

function getTrongSo() {
    switch (document.getElementById("trongso").value) {
        case "trongso5": return 0.5;
        case "trongso4": return 0.4;
        case "trongso3": return 0.3;
        case "trongso2": return 0.2;
        case "trongso0": return 0;
    }
}

function getXepLoai(ketQua) {
    if (ketQua >= 9.5) return "A+";
    if (ketQua >= 8.5) return "A";
    if (ketQua >= 8) return "B+";
    if (ketQua >= 7) return "B";
    if (ketQua >= 6) return "C+";
    if (ketQua >= 5.5) return "C";
    if (ketQua >= 5) return "D+";
    if (ketQua >= 4) return "D";
    return "F";
}

var tinhDiem = document.getElementById("tinhdiem");

tinhDiem.onclick = function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    var tenHocPhan = document.getElementById("hocphan").value;
    var soTinChi = document.getElementById("tinchi").value;
    var trongSo = getTrongSo();
    var diemQT = document.getElementById("quatrinh").value;
    var diemKT = document.getElementById("ketthuc").value;

    if (tenHocPhan == "" || soTinChi == "" || diemQT == "" || diemKT == "") {
        alert("Quên gì rồi bạn ơi!!!");
        document.getElementById("ketqua").style.display = "none";
        document.getElementById("xeploai").style.display = "none";
        return;
    }

    var ketQua = Math.round((diemQT * trongSo + diemKT * (1 - trongSo)) * 10) / 10;
    var xepLoai = getXepLoai(ketQua);

    document.getElementById("ketqua").innerHTML = "</br>" + "Điểm tổng kết" + "</br>" + ketQua + "</br>";
    document.getElementById("ketqua").style.display = "inline";
    document.getElementById("xeploai").innerHTML = "</br>" + "Xếp loại" + "</br>" + xepLoai + "</br>";
    document.getElementById("xeploai").style.display = "inline";
}
