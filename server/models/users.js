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
    chat: {
        'chatId':{type:String,require:true},
        'form':{type:String,require:true},
        'to':{type:String,require:true},
        'read':{type:Boolean,default:false},
        'content':{type:String,require:true,default:''},
        'create_time':{type:Number,default:new Date().getTime()},
    }
};

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
    getModel: function (name) {
        return mongoose.model(name);
    }
}