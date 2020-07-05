console.log("Nhìn cái gì!!! -_-");

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
                              danhSach[stt].diemKT + "</td><td>" + danhSach[stt].diemTong;
        switch (danhSach[stt].xepLoai) {
            case "A+":
            case "A":
                table += "</td><td style='color: green'>";
                break;
            case "F":
                table += "</td><td style='color: red'>";
                break;
            default:
                table += "</td><td>";
        }
        table += danhSach[stt].xepLoai + "</td></tr>";
    }
    table += "</table>";
    document.getElementById("table").innerHTML = table;
    document.getElementById("gpa").innerHTML = "<b>GPA:</b> " + 
                                               ((GPA >= 3.2) ? "<b style='color: green'>" : (GPA < 2) ? "<b style='color: red'>" : "<b>") + GPA + "</b>";
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
    if (!(hocPhan.tinChi >= 0)) hocPhan.tinChi = 0;
    hocPhan.trongSo = getTrongSo();
    hocPhan.diemQT = document.getElementById("quatrinh").value;
    if (!(hocPhan.diemQT >= 0 && hocPhan.diemQT <= 10)) hocPhan.diemQT = 0;
    hocPhan.diemKT = document.getElementById("ketthuc").value;
    if (!(hocPhan.diemKT >= 0 && hocPhan.diemKT <= 10)) hocPhan.diemKT = 0;
    hocPhan.diemTong = Math.round((hocPhan.diemQT * hocPhan.trongSo + 
                                   hocPhan.diemKT * (1 - hocPhan.trongSo)) * 10) / 10;
    hocPhan.xepLoai = (hocPhan.diemQT < 3 || hocPhan.diemKT < 3) ? "F" : getXepLoai(hocPhan.diemTong);
    hocPhan.diemQuyDoi = getDiemQuyDoi(hocPhan.xepLoai);
    
    var daThem = false;
    for (var stt = 0; stt < danhSach.length; stt++) {
        if (danhSach[stt].ten === hocPhan.ten) {
            danhSach.splice(stt, 1);
            daThem = true;
        }
    }
    danhSach.push(hocPhan);
    if (!daThem) tongTinChi += parseInt(hocPhan.tinChi);

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
    if (!(soTinChi >= 0)) soTinChi = 0;
    var trongSo = getTrongSo();
    var diemQT = document.getElementById("quatrinh").value;
    if (!(diemQT >= 0 && diemQT <= 10)) diemQT = 0;
    var diemKT = document.getElementById("ketthuc").value;
    if (!(diemKT >= 0 && diemKT <= 10)) diemKT = 0;

    if (tenHocPhan == "" || soTinChi == "" || diemQT == "" || diemKT == "") {
        console.log("Nhập sai rồi!!! -_-");
        document.getElementById("ketqua").style.display = "none";
        document.getElementById("xeploai").style.display = "none";
        return;
    }

    var ketQua = Math.round((diemQT * trongSo + diemKT * (1 - trongSo)) * 10) / 10;
    var xepLoai = getXepLoai(ketQua);

    document.getElementById("ketqua").innerHTML = "</br>" + "Điểm tổng kết" + "</br><b>" + ketQua + "</b><b style='color: gray'> / 10</b></br>";
    document.getElementById("ketqua").style.display = "inline";
    document.getElementById("xeploai").innerHTML = "</br>" + "Xếp loại" + "</br><b>" + xepLoai + "</b></br>";
    document.getElementById("xeploai").style.display = "inline";

    themDanhSach();
    inDanhSach();
}

var quangCao = document.getElementById("quangcao");

quangCao.onclick = function () {
    document.getElementById("quangcao").style.display = "none";
}