import React from 'react';
import UserCard from './../userCard/userCard';
import {getUserList} from "../../redux/charUser.redux";
import {connect} from 'react-redux';

@connect(
    state => state.chatUser,
    {getUserList}
)
class Genius extends React.Component {
    componentDidMount() {
        this.props.getUserList('genius');
    }

    render() {
        return (
            <UserCard userList={this.props.userList}></UserCard>
        )
    }
}

export default Genius;