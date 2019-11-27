var XLSX = require('xlsx-style');
var workbook = XLSX.readFile("public/han.xlsx", { cellStyles: true, bookFiles: true })
var worksheet = workbook.Sheets[workbook.SheetNames[0]];
var result = XLSX.utils.sheet_to_formulae(worksheet);

var hdoj = require("./hdoj");
var poj = require("./poj")
var sdut = require("./sdut")
var codeforces = require("./codeforces")
// worksheet['A4'].v = 10

function to26(in10) {
    let to26c = ['Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y'];
    var in26 = "";
    while (in10) {
        in26 += to26c[in10 % 26];
        if (in10 % 26 == 0) in10 -= 26;
        in10 = Math.floor(in10 / 26);
    }
    return in26.split("").reverse().join("");
}

var problemList = [];

for (var row = 9; true; row += 1) {
    if (worksheet["E" + row] == undefined) {
        problemList.push("");
        continue;
    }
    if (worksheet["E" + row].v == "#") break;
    console.log(worksheet["E" + row].v);
    problemList.push(worksheet["E" + row].v);
}

function crawl1(col) {
    return new Promise(function (resolve, reject) {
        codeforces.crawl(worksheet[to26(col) + '3'].v).then(infos => {
            for (let j = 0; j < problemList.length; ++j) {
                if (infos[problemList[j]]) {
                    worksheet[to26(col - 1) + (j + 9)].v = (infos[problemList[j]].verdict == "Accepted" ? "AC" : "ER");
                    worksheet[to26(col) + (j + 9)].v = infos[problemList[j]].time;
                }
            }
            resolve("Codeforces Done!");
        })
    })
}
function crawl2(col) {
    return new Promise(function (resolve, reject) {
        sdut.crawl(worksheet[to26(col) + '4'].v).then(infos => {
            for (let j = 0; j < problemList.length; ++j) {
                if (infos[problemList[j]]) {
                    worksheet[to26(col - 1) + (j + 9)].v = (infos[problemList[j]].verdict == "Accepted" ? "AC" : "ER");
                    worksheet[to26(col) + (j + 9)].v = infos[problemList[j]].time;
                }
            }
            resolve("Sdut Done!");
        })
    })
}
function crawl3(col) {
    return new Promise(function (resolve, reject) {
        poj.crawl(worksheet[to26(col) + '5'].v).then(infos => {
            for (let j = 0; j < problemList.length; ++j) {
                if (infos[problemList[j]]) {
                    worksheet[to26(col - 1) + (j + 9)].v = (infos[problemList[j]].verdict == "Accepted" ? "AC" : "ER");
                    worksheet[to26(col) + (j + 9)].v = infos[problemList[j]].time;
                }
            }
            resolve("Poj Done!");
        })
    })
}
function crawl4(col) {
    return new Promise(function (resolve, reject) {
        hdoj.crawl(worksheet[to26(col) + '6'].v).then(infos => {
            for (let j = 0; j < problemList.length; ++j) {
                if (infos[problemList[j]]) {
                    worksheet[to26(col - 1) + (j + 9)].v = (infos[problemList[j]].verdict == "Accepted" ? "AC" : "ER");
                    worksheet[to26(col) + (j + 9)].v = infos[problemList[j]].time;
                }
            }
            resolve("Hdoj Done!");
        })
    })
}

function crawls(col) {
    return Promise.all([crawl1(col), crawl2(col), crawl3(col), crawl4(col)]);
}

function* gen() {
    let col = 7
    while (worksheet[to26(col) + '1'].v != "#") {
        yield crawls(col)
        col += 2;
    }
    XLSX.writeFile(workbook, 'public/han.xlsx');
    console.log("All Done!");
}

function himmel(gen) {
    const item = gen.next()
    if (item.done) {
        return item.value
    }

    const { value, done } = item
    if (value instanceof Promise) {
        value.then((e) => himmel(gen))
    } else {
        himmel(gen)
    }
}

const g = gen();
himmel(g);