var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const model = require('../models/users');
const User = model.getModel('user');
const Chat = model.getModel('chat');
const _filter = {'pwd': 0, '__v': 0};

//连接mogoDB数据库
mongoose.connect('mongodb://127.0.0.1/imooc-chat');

//检查是否连接成功
mongoose.connection.on('error', function (err) {
    console.log('数据库连接失败' + err);
});

mongoose.connection.on('connected', function () {
    console.log('数据库连接成功');
});

mongoose.connection.on('open', function () {
    console.log('数据库连接成功');
});

mongoose.connection.on('disconnected', function () {
    console.log('数据库断开连接');
});


/* GET users listing. */
router.get('/list', function (req, res, next) {
    const {userId} = req.cookies;
    if (!userId) {
        return res.json({
            status: '1',
            code: '1',
            msg: 'error',
            result: ''
        });
    }
    const {type} = req.query;
    User.find({type}, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                code: '1',
                msg: 'error',
                result: ''
            })
        } else {
            res.json({
                status: '0',
                code: '0',
                msg: 'success',
                result: doc
            })
        }
    })
});

router.post('/login', function (req, res, next) {
    const {user, pwd} = req.body;
    User.findOne({user}, _filter, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                code: '1',
                msg: 'error',
                result: ''
            })
        } else {
            if (doc) {
                res.cookie('userId', doc._id, {
                    path: '/',
                    maxAge: 1000 * 60 * 60
                });
                res.json({
                    status: '0',
                    code: '0',
                    msg: 'success',
                    result: doc
                })
            } else {
                res.json({
                    status: '1',
                    code: '1',
                    msg: '用户名或密码错误',
                    result: ''
                })
            }
        }

    });
});

router.post('/register', function (req, res, next) {
    const {user, pwd, type} = req.body;
    User.findOne({user}, function (err, doc) {
        if (doc) {
            return res.json({
                code: '1',
                status: '1',
                msg: '用户名称重复',
                result: ''
            });
        }
        // User.create({user, pwd, type}, function (err, doc1) {
        //     if (err) {
        //         res.json({
        //             code: '1',
        //             status: '1',
        //             msg: '错误',
        //             result: ''
        //         });
        //     } else {
        //         res.json({
        //             code: '0',
        //             status: '0',
        //             msg: 'success',
        //             result: doc1
        //         });
        //     }
        // })
        const userModel = new User({user, pwd, type});
        // console.log(doc);
        // doc = {user, pwd, type};
        userModel.save(function (err2, doc2) {
            if (err2) {
                res.json({
                    code: '1',
                    status: '1',
                    msg: '后台存入错误',
                    result: ''
                });
            } else {
                res.cookie('userId', doc2._id, {
                    path: '/',
                    maxAge: 1000 * 60 * 60
                });
                res.json({
                    code: '0',
                    status: '0',
                    msg: 'suceess',
                    result: {user, type, _id: doc2._id}
                });
            }
        })
    });
});

router.get('/info', function (req, res, next) {
    const {userId} = req.cookies;
    if (!userId) {
        return res.json({
            status: '1',
            code: '1',
            msg: 'error',
            result: ''
        })
    }
    User.findOne({_id: userId}, _filter, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                code: '1',
                msg: 'error',
                result: ''
            })
        } else {
            res.json({
                status: '0',
                code: '0',
                msg: 'success',
                result: doc
            })
        }
    })
});

router.post('/update', function (req, res, next) {
    const userId = req.cookies.userId;
    if (!userId) {
        return res.json({
            status: '1',
            code: '1',
            msg: 'error',
            result: ''
        })
    }
    const reqData = req.body;
    User.findByIdAndUpdate(userId, reqData, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                code: '1',
                msg: '未查找到',
                result: ''
            });
        } else {
            const totalData = Object.assign({}, reqData, {
                user: doc.user,
                type: doc.type
            });
            res.json({
                status: '0',
                code: '0',
                msg: 'success',
                result: totalData
            });
        }
    })

});

router.get('/getMsgList', function (req, res, next) {
    const {userId} = req.cookies;
    if (!userId) {
        return res.json({
            status: '1',
            code: '1',
            msg: 'error',
            result: ''
        })
    }
    User.find({}, function (err, userDoc) {
        if (err) {
            return res.json({
                status: '1',
                code: '1',
                msg: 'error',
                result: ''
            })
        }
        console.log('userDoc' + userDoc);
        let users = {};
        userDoc.forEach(v => {
            users[v._id] = {name: v.user, avatar: v.avatar};
        })
        Chat.find({'$or': [{from: userId}, {to: userId}]}, function (err, doc) {
            if (err) {
                res.json({
                    status: '1',
                    code: '1',
                    msg: 'error',
                    result: ''
                })
            } else {
                res.json({
                    status: '0',
                    code: '0',
                    msg: 'success',
                    result: doc,
                    users:users
                })
            }
        })
    });
    // {'$or':[{from:user,to:user}]}


});

module.exports = router;
