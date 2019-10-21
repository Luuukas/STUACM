var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Chong516',
    database: 'stuacm'
});

function addCode(code, cotag){
    var promise = new Promise(function (resolve, reject) {
        let res = {};
        let addSql = 'INSERT INTO codes(value,isused,cotag) VALUES(?,?,?)';
        let addSqlParams = [code,0,cotag];
        connection.query(addSql, addSqlParams, function (err, result) {
            if (err) {
                res.state = 'ERROR';
                res.detail = err;
                reject(res)
            }else{
                res.state = 'OK',
                resolve(res);
            }
        });
    })
    return promise;
}

exports.addCodes = function(codes){
    for(var i=0;i<codes.length;i++){
        let code = codes[i][0];
        let cotag = codes[i][1];
        addCode(code, cotag).then((info)=>{
            console.log("added "+code);
        })
    }
}

// var codes = [
//     ["123456789", "2019"],
//     ["456454545", "2019"],
//     ["asd948dfs", "2019"]
// ]

// addCodes(codes);