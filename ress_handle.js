var formidable = require('formidable');
var fs = require('fs');
var superagent = require("superagent")
var cheerio = require("cheerio")

exports.doAdd = function (req, res, next, belong) {//对应前端请求的路径，请求方法
    var form = formidable.IncomingForm({
        encoding: 'utf-8',//上传编码
        uploadDir: "public/files",//上传目录，指的是服务器的路径，如果不存在将会报错。
        keepExtensions: true,//保留后缀
        maxFieldsSize: 2 * 1024 * 1024//byte//最大可上传大小
    });

    var allFile = [];
    var allField = [];
    form.on('progress', function (bytesReceived, bytesExpected) {//在控制台打印文件上传进度
        var progressInfo = {
            value: bytesReceived,
            total: bytesExpected
        };
        console.log('[progress]: ' + JSON.stringify(progressInfo));
        // res.write(JSON.stringify(progressInfo));
    })
        .on('field', function (name, value) {
            allField.push([name, value]);
        }) // 每当一个字段/值对已经收到时会触发该事件
        .on('file', function (filed, file) {
            allFile.push([filed, file]);//收集传过来的所有文件
        })
        .on('end', function () {
            // res.end('上传成功！');
        })
        .on('error', function (err) {
            console.error('上传失败：', err.message);
            next(err);
        })
        .parse(req, function (err, fields, files) {
            if (err) {
                console.log(err);
            }
            superagent.get('http://www.stuacm.club/Home.html').end(function (err, ares) {
                if (err) {
                    console.log(err);
                    return;
                }
                var $ = cheerio.load(ares.text);
                console.log($.html());

                allFile.forEach(function (file, index) {
                    var filename = file[1].name;;
                    var url;
                    console.log(file[1].name);

                    var h2id;
                    if (belong == "courseware") h2id = "section-4";
                    if (belong == "e-resources-1"){
                        belong = "e-resources";
                        h2id = "section-2_1";
                    }
                    if (belong == "e-resources-2"){
                        belong = "e-resources";
                        h2id = "section-2_2";
                    }
                    if (belong == "solutions") h2id = "section-5";
                    
                    aurl = "./resource/" + belong + "/" + filename

                    url = "public/resource/" + belong + "/" + filename;
                    fs.renameSync(file[1].path, url);    // 重命名文件，默认的文件名是带有一串编码的，我们要把它还原为它原先的名字。

                    var div = $("#" + h2id).next();

                    var newa = $('<a href="' + aurl + '" class="list-group-item">' + filename + '</a>');

                    div.prepend(newa);
                })
                fs.writeFile('./public/Home.html', $.html(), function (err) {
                    if (err) {
                        throw err;
                    }

                    console.log('wrote');
                });
            });
            res.send({
                code: 0
            });
        });
};
