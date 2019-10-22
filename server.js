var express = require("express");
var app = express();
var path = require('path')
var img_handler = require("./img_handle.js")
var file_handler = require("./file_handle.js")
var sql_handler = require("./sql_handle")
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')

var NodeRSA = require('node-rsa');

app.use(session({
    secret: '123456789qwe',
    // name:'11,
    cookie: { maxAge: 2 * 3600 * 1000 },
    resave: false,
    saveUninitialized: true
}))

app.use(bodyParser.json({ limit: '1mb' }));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
    extended: true
}));

app.use(cookieParser());

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
    if (req.query.acmer) {
        res.redirect("./dist/index.html#/?acmer=" + req.query.acmer);
    } else {
        res.redirect("./Home.html");
    }
})

app.get('/Home', function (req, res, next) {
    res.redirect("./Home.html");
})

app.get('/enroll', function (req, res, next) {
    res.redirect("./Enroll.html");
})

app.post('/getProfile', function (req, res, next) {
    console.log(req.body);
    sql_handler.getProfile(req.body.username).then((info) => {
        console.log(info);
        res.send({
            msg: true,
            profile: info
        });
    })
})

app.post('/postFile', function (req, res, next) {
    file_handler.doAdd(req, res, next);
})

app.post('/upgProfileImg', function (req, res, next) {
    if (req.session.username) {
        req.session.username = req.session.username;
        img_handler.doAdd(req, res, next);
    } else {
        res.send({ msg: false, info: "illegal" });
    }
})

app.post('/upgProfile', function (req, res, next) {
    if (req.session.username) {
        req.session.username = req.session.username;
        sql_handler.updateProfile(req.body.username, req.body);
        res.send({
            msg: true
        });
    } else {
        res.send({ msg: false, info: "illegal" });
    }
})

app.post('/getMindMapInfos', function (req, res, next) {
    console.log(req.body)
    sql_handler.exp_getMindMapInfos(req.body.username).then((info) => {
        res.send({
            msg: true,
            mindmap_infos: info
        })
    })
})

app.post('/newaMindMap', function (req, res, next) {
    if (req.session.username) {
        req.session.username = req.session.username;
        sql_handler.newaMindMap(req.body.username, req.body);
        res.send({
            msg: true
        });
    } else {
        res.send({ msg: false, info: "illegal" });
    }
})

app.post('/delaMindMap', function (req, res, next) {
    if (req.session.username) {
        req.session.username = req.session.username;
        sql_handler.delMindMap(req.body.username, req.body.id).then((info) => {
            res.send({
                msg: true
            });
        })
    } else {
        res.send({ msg: false, info: "illegal" });
    }
})

app.post('/upgaMindMap', function (req, res, next) {
    if (req.session.username) {
        req.session.username = req.session.username;
        sql_handler.upgaMindMap(req.body.username, req.body.id, req.body.data).then((info) => {
            res.send({
                msg: true
            });
        })
    } else {
        res.send({ msg: false, info: "illegal" });
    }
})

app.post('/newaMission', function (req, res, next) {
    if (req.session.username) {
        req.session.username = req.session.username;
        sql_handler.newaMission(req.body.username, req.body).then((info) => {
            res.send({
                msg: true
            });
        })
    } else {
        res.send({ msg: false, info: "illegal" });
    }
})

app.post('/getMissions', function (req, res, next) {
    sql_handler.exp_getMissions(req.body.username).then((info) => {
        res.send({
            msg: true,
            infos: info
        });
    })
})
var user_prider = new Array();

app.post('/prepareRSA', function (req, res) {
    let key = new NodeRSA({ b: 512 });
    let tmppubder = key.exportKey('public');
    let tmpprider = key.exportKey('private');
    user_prider[req.body.username] = tmpprider;
    res.send({
        msg: "prepared",
        tmppubder: tmppubder
    })
})

app.post('/login', function (req, res, next) {
    let privateKey = new NodeRSA(user_prider[req.body.username]);
    privateKey.setOptions({ encryptionScheme: 'pkcs1' }); // 因为jsencrypt自身使用的是pkcs1加密方案, nodejs需要修改成pkcs1。

    req.body.password = privateKey.decrypt(req.body.password, 'utf8');
    sql_handler.match(req.body.username, req.body.email, req.body.password).then((info) => {
        req.session.username = req.body.username;
        res.send({
            msg: (info.state == "CORRECT")
        });
    });
})

app.post('/logout', function (req, res, next) {
    req.session.destroy();
    res.send({
        msg: true
    })
})

app.post('/isExits', function (req, res, next) {
    sql_handler.isExits(req.body.username).then((info) => {
        res.send({
            msg: (info.state == "EXITS")
        });
    })
})

app.post('/changePW', function (req, res, next) {
    if (req.session.username) {
        req.session.username = req.session.username;

        let privateKey = new NodeRSA(user_prider[req.body.username]);
        privateKey.setOptions({ encryptionScheme: 'pkcs1' }); // 因为jsencrypt自身使用的是pkcs1加密方案, nodejs需要修改成pkcs1。

        req.body.oldpw = privateKey.decrypt(req.body.oldpw, 'utf8');
        req.body.newpw = privateKey.decrypt(req.body.newpw, 'utf8');
        sql_handler.changePassword(req.body.username, req.body.oldpw, req.body.newpw).then((info) => {
            res.send({
                msg: true
            })
        })
    } else {
        res.send({ msg: false, info: "illegal" });
    }
})

app.post('/delPersonalMission', function (req, res, next) {
    if (req.session.username) {
        req.session.username = req.session.username;
        sql_handler.delPersonalMission(req.body.username, req.body.id).then((info) => {
            res.send({
                msg: true
            })
        })
    } else {
        res.send({ msg: false, info: "illegal" });
    }
})

app.post('/enroll', function (req, res, next) {
    console.log(req.body);
    sql_handler.isExits(req.body.username).then((info) => {
        if (info.state == "ISNTEXITS") {

            let privateKey = new NodeRSA(user_prider[req.body.username]);
            privateKey.setOptions({ encryptionScheme: 'pkcs1' }); // 因为jsencrypt自身使用的是pkcs1加密方案, nodejs需要修改成pkcs1。

            req.body.password = privateKey.decrypt(req.body.password, 'utf8');
            req.body.email = privateKey.decrypt(req.body.email, 'utf8');
            req.body.code = privateKey.decrypt(req.body.code, 'utf8');            

            sql_handler.testCode(req.body.code).then((data) => {
                if (data.state == "CANUSE") {
                    var myDate = new Date();
                    var dt = myDate.toLocaleString();
                    sql_handler.createUser(req.body.username, req.body.password, req.body.email, dt, data.cotag).then((info) => {
                        res.send({
                            msg: true
                        })
                    })
                } else {
                    res.send({
                        msg: false,
                        info: data.state
                    })
                }
            })
        } else {
            res.send({
                msg: false,
                info: info.state
            })
        }
    })
})

var server = app.listen(80, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Address: http://%s:%s", host, port)

})
