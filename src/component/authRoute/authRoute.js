import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {loadData} from "../../redux/user.redux";

@withRouter
@connect(
    null,
    {loadData}
)

class AuthRoute extends React.Component {
    componentDidMount() {
        const publicList = ['/ligin', 'register'];
        const pathName = this.props.location.pathname;
        if (publicList.indexOf(pathName) > -1) {
            return null
        }
        console.log(this.props)
        axios.get('/users/info').then((response) => {
            if (response.status === 200) {
                if (response.data.code === '0') {
                    this.props.loadData(response.data.result);
                }else{
                    this.props.history.push('/login');
                }
            }
        })
    }

    render() {
        return null
    }
}

export default AuthRoute;