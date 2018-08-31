import React from 'react';
import UserCard from './../userCard/userCard';
import {getUserList} from "../../redux/charUser.redux";
import {connect} from 'react-redux';


@connect(
    state => state.chatUser,
    {getUserList}
)


class Boss extends React.Component {
    componentDidMount() {
        this.props.getUserList('boss');
    }

    render() {
        return (
            <UserCard userList={this.props.userList}></UserCard>
        )
    }
}

export default Boss;