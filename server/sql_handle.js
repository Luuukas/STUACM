var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Chong516',
    database: 'stuacm'
});

useCode = function(code){
    var promise = new Promise(function (resolve, reject) {
        updateSql = "UPDATE `stuacm`.`codes` SET `isused` = 1 WHERE (`value` = '" + code + "');";
        connection.query(updateSql, function (err, result) {
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

exports.testCode = function(code){
    var promise = new Promise(function (resolve, reject) {
        let res = {};
        let sql = 'SELECT * FROM codes WHERE value=?';
        let sqlParams = [code];
        connection.query(sql, sqlParams, function (err, result) {
            if (err) {
                res.state = "ERROR"
                reject(res)
            } else {
                if (result.length == 0) {
                    res.state = "ISNTEXITS";
                } else {
                    if(result[0].isused==1){
                        res.state = "ISUSED";
                    }else{
                        res.state = "CANUSE"
                        res.cotag = result[0].cotag;
                        useCode(code);
                    }
                }
                resolve(res);
            }
        })
    })
    return promise;
}

exports.createUser = function (username, password, email, enroll_t, tag) {
    let init_blogs = '[{"url": "", "name": ""}, {"url": "", "name": ""}, {"url": "", "name": ""}]'
    var promise = new Promise(function (resolve, reject) {
        let res = {};
        let addSql = 'INSERT INTO user(username,password,email,enroll_t,blogs,tag) VALUES(?,?,?,?,?,?)';
        let addSqlParams = [username, password, email, enroll_t,init_blogs,tag];
        connection.query(addSql, addSqlParams, function (err, result) {
            if (err) {
                res.state = 'ERROR';
                res.detail = err;
                reject(res)
            } else {
                res.state = "OK";
                {
                    let newMissionsTableSql = '\
                    CREATE TABLE `stuacm`.`missions_'+ username + '` (\
                        `id` INT NOT NULL AUTO_INCREMENT UNIQUE,\
                        `name` VARCHAR(45) NULL,\
                        `brief` TINYTEXT NULL,\
                        `belong` VARCHAR(45) NULL,\
                        `start_t` VARCHAR(45) NULL,\
                        `end_t` VARCHAR(45) NULL,\
                        `status` VARCHAR(45) NULL,\
                        `details` JSON NULL,\
                        PRIMARY KEY (`id`))charset=utf8;'
                        ;
                    connection.query(newMissionsTableSql, function (err, result) {
                        if (err) {
                            res.state = 'ERROR';
                            res.detail = err;
                            reject(res)
                        } else {
                        }
                    });
                }
                {
                    let newMindMapsTableSql = '\
                    CREATE TABLE `stuacm`.`mindmaps_'+ username + '` (\
                        `id` INT NOT NULL AUTO_INCREMENT UNIQUE,\
                        `name` VARCHAR(45) NULL,\
                        `brief` TINYTEXT NULL,\
                        `details` JSON NULL,\
                        PRIMARY KEY (`id`))charset=utf8;'
                        ;
                    connection.query(newMindMapsTableSql, function (err, result) {
                        if (err) {
                            res.state = 'ERROR';
                            res.detail = err;
                            reject(res)
                        } else {
                        }
                    });
                }
                resolve(res);
            }
        });
    })
    return promise;
}

exports.isExits = function (username) {
    var promise = new Promise(function (resolve, reject) {
        let res = {};
        let sql = 'SELECT * FROM user WHERE username="' + username + '"';
        connection.query(sql, function (err, result) {
            if (err) {
                res.state = 'ERROR';
                res.detail = err;
                reject(res);
            } else {
                if (result.length == 0) {
                    res.state = 'ISNTEXITS';
                } else {
                    res.state = 'EXITS';
                    res.profile = result[0];
                }
                resolve(res);
            }
        });
    })
    return promise;
}

// search a record in the appropriate table.
exports.match = function (username, email, password) {
    // connection.connect();
    var promise = new Promise(function (resolve, reject) {
        let res = {};
        let sql = 'SELECT * FROM user WHERE username="' + username + '" AND email="' + email + '" AND password="' + password + '"';
        connection.query(sql, function (err, result) {
            if (err) {
                res.state = 'ERROR';
                res.detail = err;
                reject(res);
            } else {
                if (result.length == 0) {
                    res.state = "WRONG";
                } else {
                    res.state = "CORRECT";
                }
                resolve(res);
            }
            // console.log('--------------------------SELECT----------------------------');
            // console.log(result);
            // console.log('------------------------------------------------------------\n\n');
        });
    })
    return promise;
    // connection.end();
}

exports.updateImgUrl = function (username, new_imgurl) {
    var promise = new Promise(function (resolve, reject) {
        updateSql = "UPDATE `stuacm`.`user` SET `img_url` = '" + new_imgurl + "' WHERE (`username` = '" + username + "');";
        connection.query(updateSql, function (err, result) {
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

exports.updateProfile = function (username, new_profile) {
    var promise = new Promise(function (resolve, reject) {
        var modSql = 'UPDATE `stuacm`.`user` SET nickname = ?,signature = ?,codeforces = ?,sdutacm = ?,blogs = ? WHERE username = ?';
        var modSqlParams = [new_profile.user_nickname, new_profile.user_signature, new_profile.user_codeforces, new_profile.user_sdutacm, JSON.stringify(new_profile.user_blogs), username];
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

exports.delPersonalMission = function (username, id) {
    var promise = new Promise(function (resolve, reject) {
        var delSql = 'DELETE FROM missions_' + username + ' where id=' + id + ' AND belong="Personal"';
        connection.query(delSql, function (err, result) {
            if (err) {
                console.log('[DELETE ERROR] - ', err.message);
                reject();
            } else {
                resolve();
            }
        });
    })
    return promise;
}

exports.newaMission = function (username, new_mission) {
    var promise = new Promise(function (resolve, reject) {
        let addSql = 'INSERT INTO missions_' + username + '(name,brief,belong,start_t,end_t,details,status) VALUES(?,?,?,?,?,?,?)';
        let addSqlParams = [new_mission.nam_name, new_mission.nam_brief, "Personal", new_mission.nam_timespan.substr(0, 19), new_mission.nam_timespan.substr(22, 19), JSON.stringify(new_mission.detail),"unknown"];
        connection.query(addSql, addSqlParams, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                reject();
            } else {
                resolve();
            }
        });
    })
    return promise;
}

exports.upgaMindMap = function (username, id, new_data) {
    var promise = new Promise(function (resolve, reject) {
        var modSql = 'UPDATE `stuacm`.`mindmaps_' + username + '` SET details = ? WHERE id = ?';
        var modSqlParams = [new_data, id];
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

exports.newaMindMap = function (username, new_mindmap) {
    var promise = new Promise(function (resolve, reject) {
        let init_data = '{"elementName":"' + new_mindmap.nam_firstnode_name + '","detail":{"left_urls":[],"right_urls":[]},"childElements":[],"permissionValue":1,"rootQNum":0,"isChange":0}';
        let addSql = 'INSERT INTO mindmaps_' + username + '(name,brief,details) VALUES(?,?,?)';
        let addSqlParams = [new_mindmap.nam_name, new_mindmap.nam_brief, init_data];
        connection.query(addSql, addSqlParams, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                reject();
            } else {
                resolve();
            }
        });
    })
    return promise;
}

exports.getProfile = function (username) {
    var promise = new Promise(function (resolve, reject) {
        let sql = 'SELECT * FROM user WHERE username="' + username + '"';
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
            } else {
                getMindMapInfos(username).then((info) => {
                    let profile = {
                        user_img: result[0].img_url,
                        user_nickname: result[0].nickname,
                        user_signature: result[0].signature,
                        user_codeforces: result[0].codeforces,
                        user_sdutacm: result[0].sdutacm,
                        user_blogs: JSON.parse(result[0].blogs),
                        mindmap_infos: info
                    }
                    resolve(profile);
                })
            }
        });
    })
    return promise;
}

getMindMapInfos = function (username) {
    var promise = new Promise(function (resolve, reject) {
        let sql = 'SELECT * FROM mindmaps_' + username;
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
            } else {
                let mindmap_infos = [];
                for (var i = 0; i < result.length; i++) {
                    mindmap_infos.push({
                        name: result[i].name,
                        id: result[i].id,
                        data: [[JSON.parse(result[i].details)]],
                        brief: result[i].brief
                    })
                }
                resolve(mindmap_infos);
            }
        });
    })
    return promise;
}

exports.exp_getMissions = function (username) {
    var promise = new Promise(function (resolve, reject) {
        let sql = 'SELECT * FROM missions_' + username;
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
            } else {
                let missions = [];
                for (var i = 0; i < result.length; i++) {
                    missions.push({
                        id: result[i].id,
                        title: result[i].name,
                        start_t: result[i].start_t,
                        end_t: result[i].end_t,
                        belong: result[i].belong,
                        status: result[i].status,
			brief: result[i].brief,
                        detail: JSON.parse(result[i].details)
                    })
                }
                resolve(missions);
            }
        });
    })
    return promise;
}

exports.delMindMap = function (username, id) {
    var promise = new Promise(function (resolve, reject) {
        var delSql = 'DELETE FROM mindmaps_' + username + ' where id=' + id;
        connection.query(delSql, function (err, result) {
            if (err) {
                console.log('[DELETE ERROR] - ', err.message);
                return;
            } else {
                resolve();
            }
        });
    })
    return promise;
}

exports.changePassword = function(username, oldpw, newpw){
    var promise = new Promise(function (resolve, reject) {
        var modSql = 'UPDATE `stuacm`.`user` SET password = ? WHERE username = ? AND password = ?';
        var modSqlParams = [newpw,username, oldpw];
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

exports.exp_getMindMapInfos = function (username) {
    return getMindMapInfos(username);
}
