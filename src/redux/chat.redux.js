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
    unread: 0,
    users: {}
};

export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return {
                ...state,
                users: action.payLoad.users,
                chatMsg: action.payLoad.msgs,
                unread: action.payLoad.msgs.filter(v => !v.read && v.to == action.payLoad.userId).length,
            };
        case MSG_RECV:
            const unread = action.payLoad.to == action.userId ? 1 : 0;
            return {...state, chatMsg: [...state.chatMsg, action.payLoad], unread: state.unread + unread};
        // case MSG_READ:
        //     return
        default:
            return state
    }
}

function msgList(msgs, users,userId) {
    return {type: MSG_LIST, payLoad: {msgs, users,userId}}
}

function msgRecv(msg,userId) {
    return {
        userId,type: MSG_RECV, payLoad: msg
    }
}

export function recvMsg() {
    return (dispatch,getState) => {
        socket.on('recvMsg', function (data) {
            console.log(data);
            const userId = getState().user._id;
            dispatch(msgRecv(data,userId));
        })
    }
}

export function getMsgList() {
    return (dispatch, getState) => {
        const userId = getState().user._id;
        axios.get('/users/getMsgList').then((response) => {
            if (response.status == 200 && response.data.code === '0') {
                console.log(getState());
                dispatch(msgList(response.data.result, response.data.users,userId));
            }
        })
    }
}

export function sendMsg({from, to, msg}) {
    return dispatch => {
        socket.emit('sendMsg', {from, to, msg})
    }

}