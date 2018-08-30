import React, {Component} from 'react';
import {connect} from 'react-redux';
import logo from './logo.svg';
import './App.css';
import { Button,List } from 'antd-mobile';
import {addGun,removeGun,addAsy} from "./redux/index";
//redux-thunk  异步处理  使用applyMiddleware开启

// const mapStatetoProps = (state) =>{
//     return {num:state};
// }
// const actionCreators = {addGun,removeGun,addAsy};
// App = connect(mapStatetoProps,actionCreators)(App);

@connect(
    state=>({ num: state.counter}),
    {addGun, removeGun, addAsy}
)

class App extends React.Component {
    constructor(props){
        super(props);
        this.addGun = this.addGun.bind(this);
        this.removeGun = this.removeGun.bind(this);
        this.addAsy = this.addAsy.bind(this);
    }

    componentWillMount() {
        // console.log(this.props.store.getState())
        console.log('这是component正在加载');
    }

    componentDidMount() {
        console.log('组件加载完毕');
    }
    addGun(){
        // this.props.store.dispatch(addGun());
        this.props.addGun()
    }
    removeGun(){
        // this.props.store.dispatch(removeGun());
        this.props.removeGun();
    }
    addAsy(){
        // this.props.store.dispatch(addAsy());
        this.props.addAsy();
    }
    render() {
        console.log('这是render');
        let boss = '李云龙';
        // let num = this.props.store.getState();
        return (
            <div>
                <h2>独立团{boss}</h2>
                <Button type="primary">按钮</Button>
                <Button type="primary" onClick={this.addGun}>+1</Button>
                <Button type="warning" onClick={this.removeGun}>-1</Button>
                <Button type="warning" onClick={this.addAsy}>toggle</Button>
                <h1>有多少{this.props.num}</h1>
            </div>
        )

    }
}




const Item = List.Item;
const Brief = Item.Brief;

class App2 extends React.Component {
    state = {
        disabled: false,
    }

    render() {
        return (<div>
            <List renderHeader={() => 'Basic Style'} className="my-list">
                <Item extra={'extra content'}>Title</Item>
            </List>
            <List renderHeader={() => 'Subtitle'} className="my-list">
                <Item arrow="horizontal" multipleLine onClick={() => {}}>
                    Title <Brief>subtitle</Brief>
                </Item>
                <Item
                    arrow="horizontal"
                    multipleLine
                    onClick={() => {}}
                    platform="android"
                >
                    ListItem （Android）<Brief>There may have water ripple effect of <br /> material if you set the click event.</Brief>
                </Item>
                <Item
                    arrow="horizontal"
                    thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                    multipleLine
                    onClick={() => {}}
                >
                    Title <Brief>subtitle</Brief>
                </Item>
            </List>
            <List renderHeader={() => 'Customized Right Side（Empty Content / Text / Image）'} className="my-list">
                <Item>Title</Item>
                <Item arrow="horizontal" onClick={() => {}}>Title</Item>
                <Item extra="extra content" arrow="horizontal" onClick={() => {}}>Title</Item>
                <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                    Title <Brief>subtitle</Brief>
                </Item>
            </List>
            <List renderHeader={() => 'Align Vertical Center'} className="my-list">
                <Item multipleLine extra="extra content">
                    Title <Brief>subtitle</Brief>
                </Item>
            </List>
            <List renderHeader={() => 'Icon in the left'}>
                <Item
                    thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                    arrow="horizontal"
                    onClick={() => {}}
                >My wallet</Item>
                <Item
                    thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
                    onClick={() => {}}
                    arrow="horizontal"
                >
                    My Cost Ratio
                </Item>
            </List>
            <List renderHeader={() => 'Text Wrapping'} className="my-list">
                <Item data-seed="logId">Single line，long text will be hidden with ellipsis；</Item>
                <Item wrap>Multiple line，long text will wrap；Long Text Long Text Long Text Long Text Long Text Long Text</Item>
                <Item extra="extra content" multipleLine align="top" wrap>
                    Multiple line and long text will wrap. Long Text Long Text Long Text
                </Item>
                <Item extra="no arrow" arrow="empty" className="spe" wrap>
                    In rare cases, the text of right side will wrap in the single line with long text. long text long text long text
                </Item>
            </List>
            <List renderHeader={() => 'Other'} className="my-list">
                <Item disabled={this.state.disabled} extra="" onClick={() => { console.log('click', this.state.disabled); this.setState({ disabled: true }); }}>Click to disable</Item>
                <Item>
                    <select defaultValue="1">
                        <option value="1">Html select element</option>
                        <option value="2" disabled>Unable to select</option>
                        <option value="3">option 3</option>
                    </select>
                </Item>
            </List>
        </div>);
    }
}


export default App;
