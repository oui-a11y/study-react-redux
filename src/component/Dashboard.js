import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Link, Redirect, Switch, NavLink} from 'react-router-dom';
import Auth from "./Auth";
import App from './../App';
import One from './one';
import Two from './two';
import {logout} from "../redux/Auth.redux";
import './../css/Dashboard.css'
import routes from './../router'

@connect(
    state => state.auth, {logout}
)


class Dashboard extends React.Component {

    oddEvent(match, location){
        console.log(match)
        console.log(location)
    }
    render() {
        // const oddEvent = (match, location) => {
        //     console.log(match);
            // if (!match) {
            //     return false
            // }
            // const eventID = parseInt(match.params.eventID)
            // return !isNaN(eventID) && eventID % 2 === 1
        // }
        const css = {
            color: 'red'
        }
        console.log(this.props);
        const match = this.props.match;
        const RedirectToLogin = <Redirect to='/login'></Redirect>;
        const app = (
            <div>
                <ul>
                    <li>
                        <Link to={`${match.url}/`}>根路径</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/one`}>第一页</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/two`}>第二页</Link>
                    </li>
                </ul>
                <ul>
                    <li><NavLink exact isActive={this.oddEvent} to={`${match.url}/one`} activeStyle={{color: 'green'}}>根路径</NavLink></li>
                    <li><NavLink to={`${match.url}/one`} activeStyle={css}>第一页</NavLink></li>
                    <li><NavLink to={`${match.url}/two`} activeClassName="active-bar">第二页</NavLink></li>
                </ul>
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                    />
                ))}
                {/*{routes.map((route, index) => (*/}
                {/*<Route*/}
                {/*key={index}*/}
                {/*path={route.path}*/}
                {/*exact={route.exact}*/}
                {/*component={route.sidebar}*/}
                {/*/>*/}
                {/*))}*/}
                {/*<Route path='/dashboard/' exact component={App}></Route>*/}
                {/*<Route path='/dashboard/one' component={One}></Route>*/}
                {/*<Route path='/dashboard/two' component={Two}></Route>*/}
                <button onClick={this.props.logout}>注销</button>
            </div>
        );
        return this.props.isAuth ? app : RedirectToLogin;

    }
}

export default Dashboard