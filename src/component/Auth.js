import React, {Component} from 'react';
import {connect} from 'react-redux'
import {BrowserRouter, Route, Link, Redirect, Switch} from 'react-router-dom';
import {login} from "../redux/Auth.redux";

@connect(
    state => state.auth,
    {login}
)
class Auth extends React.Component {

    render() {
        console.log(this.props);
        return (
            <div>
                <h1>Auth</h1>
                <h2>你没有权限,请登录查看</h2>
                {this.props.isAuth? <Redirect to='/dashboard'></Redirect> : null}
                <button onClick={this.props.login}>登录</button>
            </div>
        )
    }
}

export default Auth