var superagent = require("superagent"),
    cheerio = require("cheerio")

var baseUrl = "http://poj.org/"

var delay = parseInt((Math.random() * 30000000) % 1000, 10);
function getInfo(url, infoArray) {
    console.log(url);
    var p = new Promise(function (resolve, reject) {
        superagent.get(url).end(function (err, ares) {
            if (err) {
                console.log(err);
                return;
            }

            var $ = cheerio.load(ares.text);
            var atable = $(".in").parent();
            var trs = $(atable).children("tr");
            

            var submissionsNum = trs.length;    // how many submissions in this page

            if(submissionsNum==1) resolve(baseUrl);

            for (var i = 1; i < submissionsNum; i++) {
                var problem = $($($(trs[i]).children("td")[2]).children("a")[0]).text();
                var problemurl = baseUrl + $($($(trs[i]).children("td")[2]).children("a")[0]).attr("href");
                var result = $($($(trs[i]).children("td")[3]).children("font")[0]).text();
                var time = $($(trs[i]).children("td")[8]).text();
                if (infoArray[problemurl] == undefined || result == "Accepted") {
                    infoArray[problemurl] = {
                        "problem": problem,
                        "verdict": result,
                        "time": time
                    }
                }
            }
            var nextPage = $($($("p")[1]).children("a")[2]).attr("href");
            resolve(baseUrl+nextPage);

        })
        setTimeout(function () { }, 300);
    }).then(function (nextUrl) {
        if (nextUrl!=baseUrl) {
            getInfo(nextUrl, infoArray);
        }
    })
}

exports.crawl = function (poj_handle) {
    var promise = new Promise(function (resolve, reject) {
        if (poj_handle != "") {
            var infoArray = {};
            console.log(baseUrl + "status?user_id=" + poj_handle);
            getInfo(baseUrl + "status?user_id=" + poj_handle, infoArray);
            setTimeout(function () {
                resolve(infoArray);
            }, 20000);
        } else {
            resolve({});
        }
    })
    return promise;
}