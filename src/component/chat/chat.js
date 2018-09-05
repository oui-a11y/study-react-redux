import React from 'react';
// import io from 'socket.io-client';
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile';
import {connect} from 'react-redux';
import {getMsgList, sendMsg, recvMsg, readMsg} from "../../redux/chat.redux";
import {getChatId} from "../../unti/untiFn";

// const socket = io('ws://localhost:9890');
// socket.on('recvMsg',function(data){
//     console.log(data);
// });
@connect(
    state => state,
    {getMsgList, sendMsg, recvMsg, readMsg}
)
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            msg: [],
            showEmoji: false
        }
    }

    componentDidMount() {
        console.log(this.props);
        if (!this.props.chat.chatMsg.length) {
            this.props.getMsgList();
            this.props.recvMsg();
        }

        this.fixCarousel();
        // socket.on('recvMsg', (data) => {
        //     console.log(data);
        //     this.setState({
        //         msg: [...this.state.msg, data.text]
        //     })
        // });
    }

    componentWillUnmount() {
        const to = this.props.match.params.user;
        this.props.readMsg(to);
    }

    handleSubmit() {
        // socket.emit('sendMsg', {text: this.state.text});

        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;


        this.props.sendMsg({from, to, msg});
        this.setState({text: '', showEmoji: false});
    }

    fixCarousel() {
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }

    render() {
        const emoji = '😂 😀 😀 🤣 😄 😉 😍 😘 🤩 🙄 😥 🤢 😂 😀 😀 🤣 😄 😉 😍 😘 🤩 🙄 😥 🤢 😂 😀 😀 🤣 😄 😉 😍 😘 🤩 🙄 😥 🤢 😂 😀 😀 🤣 😄 😉 😍 😘 🤩 🙄 😥 🤢'.split(' ').filter(v => v).map(v => ({text: v}));
        const userId = this.props.match.params.user;
        const users = this.props.chat.users;
        if (!users[userId]) {
            return null
        }
        console.log(this.props);
        const chatId = getChatId(userId, this.props.user._id);
        const chatData = this.props.chat.chatMsg.filter(v => v.chatId === chatId);
        console.log(chatData);
        const Item = List.Item;
        return (
            <div id='chat-page'>
                <NavBar mode='dark' className='header-top' icon={<Icon type="left"/>}
                        onLeftClick={() => {
                            this.props.history.goBack();
                        }}>{users[userId].name}</NavBar>
                {chatData.map(v => {
                    const avatar = require(`../img/${users[v.from].avatar}.png`);
                    return v.from == userId ? (
                        <List key={v._id}>
                            <Item thumb={avatar}>{v.content}</Item>
                        </List>
                        // <p key={v._id}>对方发来的:{v.content}</p>
                    ) : (
                        <List key={v._id}>
                            <Item extra={<img src={avatar}/>} className='chat-me'>{v.content}</Item>
                        </List>

                        // <p key={v._id}>我发的:{v.content}</p>
                    )
                })}
                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v => {
                                this.setState({text: v})
                            }}
                            extra={
                                <div>
                                    <span style={{marginRight: 15}} onClick={() => {
                                        this.setState({showEmoji: !this.state.showEmoji})
                                        this.fixCarousel();
                                    }}>😂</span>
                                    <span onClick={() => this.handleSubmit()}>发送</span>
                                </div>
                            }
                        ></InputItem>
                    </List>
                    {this.state.showEmoji ? (
                        <Grid
                            data={emoji}
                            columnNum={7}
                            isCarousel={true}
                            onClick={el => {
                                this.setState({
                                    text: this.state.text + el.text
                                })
                            }}
                        />
                    ) : null}
                </div>
            </div>
        )
    }
}

export default Chat;