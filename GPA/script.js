console.log("Đã có cái mẹ gì đâu -_-");

let danhSach = [];
let tongTinChi = 0;
let GPA = 0;
let table = "";

function inDanhSach() {
    console.clear();
    console.table(danhSach);
    console.log("GPA: " + GPA);

    table = "<table>";
    table += "<tr><th>Học phần</th><th>Tín chỉ</th><th>Trọng số</th><th>Điểm quá trình</th>" + 
                 "<th>Điểm kết thúc</th><th>Điểm tổng kết</th><th>Xếp loại</th></tr>";
    for (var stt = 0; stt < danhSach.length; stt++) {
        table += "<tr><td>" + danhSach[stt].ten + "</td><td>" + danhSach[stt].tinChi + "</td><td>" +
                              danhSach[stt].trongSo + "</td><td>" + danhSach[stt].diemQT + "</td><td>" + 
                              danhSach[stt].diemKT + "</td><td>" + danhSach[stt].diemTong + "</td><td>" + 
                              danhSach[stt].xepLoai +
                 "</td></tr>"
    }
    table += "</table>";

    document.getElementById("table").innerHTML = table;
    document.getElementById("gpa").innerHTML = "GPA: " + GPA;
}

function themDanhSach() {
    var hocPhan = {
        ten: "",
        tinChi: 0,
        trongSo: 0,
        diemQT: 0,
        diemKT: 0,
        diemTong: 0,
        xepLoai: "F",
        diemQuyDoi: "0"
    };

    hocPhan.ten = document.getElementById("hocphan").value;
    hocPhan.tinChi = document.getElementById("tinchi").value;
    hocPhan.trongSo = getTrongSo();
    hocPhan.diemQT = document.getElementById("quatrinh").value;
    hocPhan.diemKT = document.getElementById("ketthuc").value;
    hocPhan.diemTong = Math.round((hocPhan.diemQT * hocPhan.trongSo + 
                                   hocPhan.diemKT * (1 - hocPhan.trongSo)) * 10) / 10;
    hocPhan.xepLoai = (hocPhan.diemQT < 3 || hocPhan.diemKT < 3) ? "F" : getXepLoai(hocPhan.diemTong);
    hocPhan.diemQuyDoi = getDiemQuyDoi(hocPhan.xepLoai);
    
    for (var stt = 0; stt < danhSach.length; stt++) {
        if (danhSach[stt].ten === hocPhan.ten) {
            danhSach.splice(stt, 1);
        }
    }
    danhSach.push(hocPhan);
    tongTinChi += parseInt(hocPhan.tinChi);

    var tong = 0;
    for (var stt = 0; stt < danhSach.length; stt++) {
        tong += danhSach[stt].diemQuyDoi * danhSach[stt].tinChi;
    }

    GPA = Math.round((tong / tongTinChi) * 100) / 100;
}


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

function getDiemQuyDoi(xepLoai) {
    switch (xepLoai) {
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
        alert("Bình tĩnh bạn ơi!!!");
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

    themDanhSach();
    inDanhSach();
}
