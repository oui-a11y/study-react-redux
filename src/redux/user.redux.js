import axios from 'axios';
import {md5Pwd,getRedirectPath} from '../unti/untiFn';


const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';

const initState = {
    isAuth: false,
    msg: '',
    user: '',
    type: ''
};

//reducers

export function user(state = initState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {...state, msg: '', isAuth: true,redirectTo:getRedirectPath(action.payload), ...action.payload};
        case LOGIN_SUCCESS:
            return {...state, msg: '', isAuth: true,redirectTo:getRedirectPath(action.payload), ...action.payload};
        case ERROR_MSG:
            return {...state, msg: action.msg, isAuth: false};
        case LOAD_DATA:
            return {...state, ...action.payload};
        default:
            return state
    }
}

//action

function registerSuccess(data) {
    return {type: REGISTER_SUCCESS, payload: data};
}

function loginSuccess(data) {
    return {type: LOGIN_SUCCESS, payload: data};
}

function errorMsg(msg) {
    return {msg, type: ERROR_MSG}
}

export function loadData(userInfo) {
    return {type: LOAD_DATA, payload: userInfo};
}

export function register({user, pwd, repeatPwd, type}) {
    console.log(user, pwd, repeatPwd, type);
    if (!user || !pwd) {
        return errorMsg('用户密码必须输入');
    }
    if (pwd !== repeatPwd) {
        return errorMsg('密码和确认密码不同');
    }
    return dispatch => {
        axios.post('/users/register', {user, pwd:md5Pwd(pwd), type}).then((response) => {
            if (response.status == 200 && response.data.code == '0') {
                dispatch(registerSuccess({user, type}));
            } else {
                dispatch(errorMsg(response.data.msg));
            }
        })
    }
}

export function login({user, pwd}) {
    if (!user || !pwd) {
        return errorMsg('用户密码必须输入');
    }
    return dispatch => {
        axios.post('/users/login', {user, pwd:md5Pwd(pwd)}).then((response) => {
            if (response.status == 200 && response.data.code == '0') {
                console.log(response.data);
                dispatch(loginSuccess(response.data.result));
            } else {
                dispatch(errorMsg(response.data.msg));
            }
        })
    }
}

