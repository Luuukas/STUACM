var express = require("express");
var app = express();
var path = require('path')
var bodyParser = require('body-parser')

app.use(bodyParser.json({ limit: '1mb' }));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));

// 打包前端项目，整合前，需要下面代码解决跨域问题，整合后则不存在跨域问题

//allow custom header and CORS
app.all('*', function (req, res, next) {
    //当Access-Control-Allow-Credentials设为true时，Access-Control-Allow-Origin不能设置为星号
    res.header('Access-Control-Allow-Origin', 'http://stuacm.club');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    //将Access-Control-Allow-Credentials设为true
    res.header('Access-Control-Allow-Credentials', true);
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);    // 让options请求快速返回
    }
    else {
        next();
    }
});

app.get('/', function (req, res, next) {
    res.redirect("./Home.html");
})

app.get('/Home', function (req, res, next) {
    res.redirect("./Home.html");
})

var server = app.listen(80, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Address: http://%s:%s", host, port)

})
