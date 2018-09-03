//合并所有reduces并且返回

import { combineReducers } from 'redux'

// import {counter} from "./index";

// import {auth} from "./Auth.redux";

import {user} from "./user.redux";

import {chatUser} from "./charUser.redux";

import {chat} from "./chat.redux";

export default combineReducers({user,chatUser,chat});