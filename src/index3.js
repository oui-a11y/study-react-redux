import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {BrowserRouter, Route, Link, Redirect, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
// import {counter} from "./redux/index";
import combineReducers from './redux/combinReduces'
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import One from './component/one';
import Two from './component/two';
import Three from './component/three';
import Auth from './component/Auth';
import Dashboard from './component/Dashboard';
import registerServiceWorker from './registerServiceWorker';

// import {createStore} from 'redux'
//
// //新建store
// //通过reducer简历
// //根据老的state和action 生成新的state
// function counter(state=0, action) {
//     // let state = state||0
//     switch (action.type) {
//         case '加机关枪':
//             return state + 1
//         case '减机关枪':
//             return state - 1
//         default:
//             return 10
//     }
// }
//
// //新建store
// const store = createStore(counter);
// const init = store.getState();
// console.log(init);
//
// //派发事件 传递action
//
// function listener() {
//     console.log(`现在有多少机关枪${store.getState()}`)
// }
// store.subscribe(listener);
// store.dispatch({ type: '加机关枪' });
// store.dispatch({ type: '加机关枪' });
// console.log(store.getState());

const store = createStore(combineReducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));
console.log(store.getState());

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <Switch>
                {/*<Redirect to='/' ></Redirect>*/}
                <Route path='/login' exact component={Auth}></Route>
                {/*<Route path='/:location' component={Three}></Route>*/}
                <Route path='/dashboard' component={Dashboard}></Route>
                <Redirect to='/dashboard'></Redirect>
            </Switch>
            {/*<div>*/}
            {/*<ul>*/}
            {/*<li>*/}
            {/*<Link to='/'>根路径</Link>*/}
            {/*</li>*/}
            {/*<li>*/}
            {/*<Link to='/one'>第一页</Link>*/}
            {/*</li>*/}
            {/*<li>*/}
            {/*<Link to='three'>第二页</Link>*/}
            {/*</li>*/}
            {/*</ul>*/}
            {/*类似vue重定向*/}
            {/*<Switch>*/}
            {/*/!*<Redirect to='/' ></Redirect>*!/*/}
            {/*<Route path='/' exact component={App}></Route>*/}
            {/*/!*<Route path='/:location' component={Three}></Route>*!/*/}
            {/*<Route path='/one' component={One}></Route>*/}
            {/*<Route path='/three' component={Two}></Route>*/}
            {/*<Route component={Three}></Route>*/}

            {/*</Switch>*/}
            {/*</div>*/}
        </BrowserRouter>

    </Provider>), document.getElementById('root')
);
registerServiceWorker();


