import axios from 'axios';

const USER_LIST = 'USER_LIST';

const initState = {
    userList:[]
};

//reduces
export function chatUser(state = initState, action) {
    switch (action.type) {
        case USER_LIST:
            return {...state, userList:action.payLoad};
        default:
            return state
    }
}

//action

function userList(data) {
    return {type: USER_LIST, payLoad: data}
}

export function getUserList(type) {
    return dispatch => {
        axios.get('users/list', {
            params: {
                type: type
            }
        }).then((response) => {
            if (response.status === 200 && response.data.code === '0') {
                dispatch(userList(response.data.result));
            }
        })
    }
}

