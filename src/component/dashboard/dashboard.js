import React from 'react';
import {NavBar} from 'antd-mobile';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import NavLinkBar from './../navLink/navLink';
import Boss from './../boss/boss';
import Genius from './../genius/genius';
import User from './../user/user';
import Msg from './../message/message';
import {getMsgList, recvMsg} from "../../redux/chat.redux";


@connect(
    state => state,
    {getMsgList, recvMsg}
)

class Dashboard extends React.Component {
    componentDidMount() {
        if (!this.props.chat.chatMsg.length) {
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }

    render() {
        const pathname = this.props.location.pathname;
        const user = this.props.user;
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Genius,
                hide: user.type === 'genius'
            },
            {
                path: '/genius',
                text: 'boss',
                icon: 'job',
                title: 'BOSS列表',
                component: Boss,
                hide: user.type === 'boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg,
            },
            {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User,
            },
        ];
        return (
            <div>
                <NavBar className='fixd-header' mode='dard'
                        onClick={() => this.proClick}>{navList.find(v => v.path === pathname).title}</NavBar>
                <div style={{marginTop: 45}}>
                    <Switch>
                        {navList.map(item => (
                            <Route path={item.path} component={item.component} key={item.path}></Route>
                        ))}

                    </Switch>
                </div>

                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}

export default Dashboard;