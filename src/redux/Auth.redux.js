const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const USER_DATA = 'USER_DATA';

const initState = {
    isAuth: false,
    user: 'xinxin',
    age: 20
};

//reduces
export function auth(state = initState, action) {
    switch (action.type) {
        case LOGIN:
            return {...state, isAuth: true};
        case LOGOUT:
            return {...state, isAuth: false};
        default:
            return state
    }
}

//action

export function login() {
    return {type: LOGIN}
}

export function logout() {
    return {type: LOGOUT}
}