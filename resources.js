var express = require("express");
var app = express();
var path = require('path')
var bodyParser = require('body-parser')
var ress_handler = require('./ress_handle')
var fs = require('fs');
var superagent = require("superagent")
var cheerio = require("cheerio")

app.use(bodyParser.json({ limit: '1mb' }));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));

//allow custom header and CORS
app.all('*', function (req, res, next) {
    //当Access-Control-Allow-Credentials设为true时，Access-Control-Allow-Origin不能设置为星号
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);    // 让options请求快速返回
    }
    else {
        next();
    }
});

app.get('/manage', function (req, res) {
    res.redirect('./ManageHome.html');
})

app.post('/uploadCourseware', function (req, res, next) {
    ress_handler.doAdd(req, res, next, "courseware");
})

app.post('/uploadEresources1', function (req, res, next) {
    ress_handler.doAdd(req, res, next, "e-resources-1");
})

app.post('/uploadEresources2', function (req, res, next) {
    ress_handler.doAdd(req, res, next, "e-resources-2");
})

app.post('/uploadSolutions', function (req, res, next) {
    ress_handler.doAdd(req, res, next, "solutions");
})

app.post('/addWebsite', function (req, res, next) {
    superagent.get('http://www.stuacm.club/Home.html').end(function (err, ares) {
        if (err) {
            console.log(err);
            return;
        }
        var $ = cheerio.load(ares.text);
        var div = $("#section-3").next();
        var newa = $('<a href="' + req.body.href + '" class="list-group-item">' + req.body.name + '</a>');
        div.prepend(newa);
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
})

app.post('/delWebsite', function (req, res, next) {
    var aurl = req.body.href;
    console.log(aurl);
    superagent.get('http://www.stuacm.club/Home.html').end(function (err, ares) {
        if (err) {
            console.log(err);
            return;
        }
        var $ = cheerio.load(ares.text);
        $("[href='" + aurl + "']").remove();
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
})

app.post('/deleteResource', function (req, res) {
    var aurl = req.body.href;
    var patt = /\/.*$/;
    var furl = aurl.match(patt)[0];
    console.log(aurl);
    superagent.get('http://www.stuacm.club/Home.html').end(function (err, ares) {
        if (err) {
            console.log(err);
            return;
        }
        var $ = cheerio.load(ares.text);
        $("[href='" + aurl + "']").remove();
        console.log($("[href='" + aurl + "']"));
        fs.writeFile('./public/Home.html', $.html(), function (err) {
            if (err) {
                throw err;
            }
            fs.unlink("./public" + furl, function (error) {
                if (error) {
                    console.log(error);
                    return false;
                }
                console.log('deleted');
            })
            console.log('wrote');
        });
    });
    res.send({
        code: 0
    });
})

var server = app.listen(8082, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Address: http://%s:%s", host, port)

})
