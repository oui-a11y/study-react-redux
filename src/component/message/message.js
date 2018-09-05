import React from 'react';
import {connect} from 'react-redux';
import {List, Badge} from 'antd-mobile';


@connect(
    state => state
)


class Msg extends React.Component {
    getLast(arr) {
        return arr[arr.length - 1];
    }

    render() {
        const Item = List.Item;
        const Brief = Item.Brief;
        console.log(this.props);
        const msgGroup = {};
        const userList = this.props.chat.users;
        const userId = this.props.user._id;
        this.props.chat.chatMsg.forEach(v => {
            msgGroup[v.chatId] = msgGroup[v.chatId] || [];
            msgGroup[v.chatId].push(v);
        });
        console.log(msgGroup);
        console.log(Object.values(msgGroup));
        const chatList = Object.values(msgGroup).sort((a, b) => {
            const a_last = this.getLast(a).create_time;
            const b_last = this.getLast(b).create_time;
            return b_last - a_last;
        });
        return (
            <div>
                <List>
                    {chatList.map(v => {
                        console.log(v)
                        const lastItem = this.getLast(v);
                        const targetId = v[0].from == userId ? v[0].to : v[0].from;
                        const unreadNum = v.filter(v => !v.read && v.to == userId).length;
                        const name = userList[targetId] ? userList[targetId].name : null;
                        const avatar = userList[targetId] ? userList[targetId].avatar : null;
                        return (
                            <Item
                                arrow="horizontal"
                                key={lastItem._id}
                                thumb={require(`../img/${avatar}.png`)}
                                extra={<Badge text={unreadNum}></Badge>}
                                onClick={()=>{
                                    this.props.history.push(`/chat/${targetId}`);
                                }}
                            >
                                {lastItem.content}
                                <Brief>{name}</Brief>
                            </Item>
                        )
                    })}

                </List>
            </div>
        )
    }
}


export default Msg;