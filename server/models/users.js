var mongoose = require('mongoose');

const models = {
    user: {
        'user': {type: String, 'require': true},
        'pwd': {type: String, 'require': true},
        'type': {type: String, 'require': true},
        //头像
        'avatar': {type: String},
        //个人简介或者职位介绍
        'desc': {type: String},
        //职位名称
        'title': {type: String},
        //如果是boss
        'company': {type: String},
        'money': {type: String}

    },
    chat: {}
};

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
    getModel: function (name) {
        return mongoose.model(name);
    }
}