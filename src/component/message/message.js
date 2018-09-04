import React from 'react';
import {connect} from 'react-redux';


@connect(
    state=>state
)


class Msg extends React.Component{
    render(){
        console.log(this.props);
        const msgGroup = {};
        this.props.chat.chatMsg.forEach(v=>{
            msgGroup[v.chatId] = msgGroup[v.chatId] || []
            msgGroup[v.chatId].push(v);
        });
        console.log(msgGroup);
        return(
            <div></div>
        )
    }
}


export default Msg;