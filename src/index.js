import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {BrowserRouter, Route, Link, Redirect, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import combineReducers from './redux/combinReduces'
import thunk from 'redux-thunk';
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authRoute/authRoute';
import './config/axios.config';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(combineReducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));
console.log(store.getState());

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Route path='/login' exact component={Login}></Route>
                <Route path='/register' exact component={Register}></Route>
            </div>
        </BrowserRouter>

    </Provider>), document.getElementById('root')
);
registerServiceWorker();


