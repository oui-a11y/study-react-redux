import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose} from 'redux';
import {counter} from "./redux/index";
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
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

const store = createStore(counter,compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

function render(){
    ReactDOM.render(<App store={store}/>, document.getElementById('root'));
    registerServiceWorker();
}
render();
store.subscribe(render);

