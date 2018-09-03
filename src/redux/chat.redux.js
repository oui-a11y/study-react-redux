import axios from 'axios';
import io from 'socket.io-client';

const socket = io('ws://localhost:9890');

//获取聊天列表
const MSG_LIST = 'MSG_LIST';
//读取信息
const MSG_RECV = 'MSG_RECV';
//标识已读
const MSG_READ = 'MSG_READ';

const initState = {
    chatMsg: [],
    unread: 0
};

export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return {...state, chatMsg: action.payLoad, unread: action.payLoad.filter(v => !v.read).length};
        case MSG_RECV:
            return {...state, chatMsg: [...state.chatMsg, action.payLoad], unread: state.unread + 1};
        // case MSG_READ:
        //     return
        default:
            return state
    }
}

function msgList(msgs) {
    return {type: MSG_LIST, payLoad: msgs}
}

function msgRecv(msg) {
    return {
        type: MSG_RECV, payLoad: msg
    }
}

export function recvMsg() {
    return dispatch => {
        socket.on('recvMsg', function (data) {
            console.log(data);
            dispatch(msgRecv(data));
        })
    }
}

export function getMsgList() {
    return dispatch => {
        axios.get('/users/getMsgList').then((response) => {
            if (response.status == 200 && response.data.code === '0') {
                dispatch(msgList(response.data.result));
            }
        })
    }
}

export function sendMsg({from, to, msg}) {
    return dispatch => {
        socket.emit('sendMsg', {from, to, msg})
    }

}