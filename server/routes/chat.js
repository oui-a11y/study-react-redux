var express = require('express');
var router = express.Router();
var socket_io = require('socket.io');

const model = require('../models/users');
const Chat = model.getModel('chat');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.prepareSocketIO = function (server) {
    var io = socket_io.listen(server);
    io.sockets.on('connection', function (socket) {
        console.log('user login');
        // socket.on('join', function (user) {
        //     socket.user = user;
        //     socket.emit('state', 'SERVER', true);
        //     socket.broadcast.emit('state', 'SERVER', user + '上线了');
        // });
        socket.on('sendMsg', function (data) {
          console.log(data);
          const {from,to,msg} = data;
          const chatId = [from,to].sort().join('_');
          Chat.create({chatId,from,to,content:msg},function(err,doc){
              if(err){
                  return console.log(err);
              }
              console.log('dov!!!'+doc);
              io.emit('recvMsg',Object.assign({},doc._doc));
          })
          console.log(chatId);
          // io.emit('recvMsg',msg);
            // socket.emit('chat', socket.user, msg);
            // socket.broadcast.emit('chat', socket.user, msg);
        });
        // io.on('sendmsg',function(data){
        //   console.log(data);
        // })

    });

};

module.exports = router;
