var superagent = require("superagent"),
    cheerio = require("cheerio")

var baseUrl = "http://acm.hdu.edu.cn"

var delay = parseInt((Math.random() * 30000000) % 1000, 10);
function getInfo(url, infoArray) {
    var p = new Promise(function (resolve, reject) {
        console.log(url);
        superagent.get(url).end(function (err, ares) {
            if (err) {
                console.log(err);
                return;
            }

            var $ = cheerio.load(ares.text);
            var atable = $($("#fixed_table").children("table")[0]).children("tbody")[0];
            var trs = $(atable).children("tr");

            var submissionsNum = trs.length;    // how many submissions in this page

            for (var i = 1; i < submissionsNum; i++) {
                var problem = $($($(trs[i]).children("td")[3]).children("a")[0]).text();
                var problemurl = baseUrl + $($($(trs[i]).children("td")[3]).children("a")[0]).attr("href");
                var result = $($($(trs[i]).children("td")[2]).children("font")[0]).text();
                var time = $($(trs[i]).children("td")[1]).text();
                if (infoArray[problemurl] == undefined || result == "Accepted") {
                    infoArray[problemurl] = {
                        "problem": problem,
                        "verdict": result,
                        "time": time
                    }
                }
            }
            if($(".footer_link").children("a").length < 7) resolve(baseUrl);
            var nextPage = $($(".footer_link").children("a")[2]).attr("href");
            resolve(baseUrl+nextPage);

        })
        setTimeout(function () { }, 300);
    }).then(function (nextUrl) {
        if (nextUrl!=baseUrl) {
            getInfo(nextUrl, infoArray);
        }
    })
}

exports.crawl = function (hdoj_handle) {
    var promise = new Promise(function (resolve, reject) {
        if (hdoj_handle != "") {
            var infoArray = {};
            getInfo(baseUrl + "/status.php?user=" + hdoj_handle, infoArray);
            
            setTimeout(function () {
                resolve(infoArray);
            }, 20000);
        } else {
            resolve({});
        }
    })
    return promise;
}