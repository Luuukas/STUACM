var cf_worker = require('./CODEFORCES_worker')
var sd_worker = require('./SDUT_worker')
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Chong516',
    database: 'stuacm'
});
function dateFormat() {
    var date = new Date();
    var dateStr = date.getFullYear() + "-" + (parseInt(date.getMonth()) < 10 ? "0" : "") + (parseInt(date.getMonth()) % 12 + 1) + "-" + date.getDate();
    dateStr += " 00:00:00";
    return dateStr;
}
function getProblemStatus(cf_handle, sd_handle) {
    var promise = new Promise(function (resolve, reject) {
        var tot_data;
        cf_worker.crawl(cf_handle).then((cf_data) => {    // 爬取codeforces上的所有提交记录
            tot_data = cf_data;
            return sd_worker.crawl(sd_handle)    // 爬取sdutacm上的所有提交记录
        }).then((sd_data) => {
            tot_data = Object.assign(sd_data, tot_data);    // 合并所有提交记录
            resolve(tot_data);
        })
    })
    return promise;
}
function update(username, id, new_status, new_details) {
    var promise = new Promise(function (resolve, reject) {
        var modSql = 'UPDATE missions_' + username + ' SET status = ?, details = ? WHERE id = ?';
        var modSqlParams = [new_status, new_details, id];
        connection.query(modSql, modSqlParams, function (err, result) {
            if (err) {
                console.log('[UPDATE ERROR] - ', err.message);
                reject();
            } else {
                resolve();
            }
        });
    })
    return promise;
}
exports.refresh = function() {
    let promise = new Promise(function (resolve, reject) {
        let sql = 'SELECT * FROM user';
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT 1 ERROR] - ', err.message);
            } else {
                let now_t = dateFormat();    // 获取爬取时的时间
                for (var i = 0; i < result.length; i++) {    // 逐个用户处理
                    let username = result[i].username;
                    let cf_handle = result[i].codeforces;
                    let sd_handle = result[i].sdutacm;
                    getProblemStatus(cf_handle, sd_handle).then((tot_data) => {
                        // 获取该用户在各OJ上的提交记录后
                        let sql = 'SELECT * FROM missions_' + username;
                        // 遍历该用户的所有任务
                        connection.query(sql, function (err, result) {
                            if (err) {
                                console.log('[SELECT 2 ERROR] - ', err.message);
                            } else {
                                for (var j = 0; j < result.length; j++) {    // 逐个任务处理
                                    let promise2 = new Promise(function (resolve2, reject2) {

                                        let end_t = result[j].end_t;
                                        let details = JSON.parse(result[j].details);
                                        let right_urls = details.right_urls;

                                        let valid_cnt = 0;    // 计算任务中 在可爬取OJ上的题目数量 （用户自定义的题目不一定在限定的OJ上）
                                        let pass_cnt = 0;    // 通过题目数量

                                        for (var k = 0; k < right_urls.length; k++) {    // 逐个题目处理
                                            let url = right_urls[k].url;

                                            valid_cnt += (url.substr(0, 21) == "http://codeforces.com" || url.substr(0, 22) == "https://codeforces.com" || url.substr(0, 22) == "http://acm.sdut.edu.cn" || url.substr(0, 23) == "https://acm.sdut.edu.cn");

                                            right_urls[k].status0 = right_urls[k].status1 = "unknown";

                                            if (tot_data[url]) {    // 以题目url为健，如果提交记录中存在
                                                right_urls[k].status1 = (tot_data[url].verdict=="OK"?"Accepted":tot_data[url].verdict);

                                                pass_cnt += (right_urls[k].status1 == "Accepted");

                                                if (now_t <= end_t) {    // 如果该任务还未结束
                                                    right_urls[k].status0 = right_urls[k].status1;
                                                }
                                            }
                                        }
                                        // 把新的状态更新回去
                                        details.right_urls = right_urls;

                                        resolve2({
                                            id: result[j].id,
                                            status: (pass_cnt == valid_cnt ? "finished" : "unfinished"),
                                            details: JSON.stringify(details)
                                        })
                                    }).then((info) => {
                                        update(username, info.id, info.status, info.details).then((done)=>{
                                            console.log("done : "+username+" ... missions : "+info.id);
                                        })
                                    })
                                }
                            }
                        });
                    })
                }
                resolve();
            }
        });
    })
    return promise;
}