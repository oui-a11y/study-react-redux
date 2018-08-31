import React from 'react';
import {NavBar, InputItem, TextareaItem, Button, WhiteSpace, WingBlank} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {update} from "../../redux/user.redux";
import AvatarSelector from '../../component/avatar-selector/avatar-selector';


@connect(
    state => state.user,
    {update}
)


class BossInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            desc: '',
            company: '',
            money: ''
        };
        this.selectAvatar = this.selectAvatar.bind(this);
    }

    selectAvatar(el) {
        this.setState({avatar: el.text});
    }

    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    render() {
        console.log(this.props);
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        return (
            <div>
                <NavBar mode="dark">BOSS完善页</NavBar>
                {redirect && path !== redirect ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <AvatarSelector selectAvatar={this.selectAvatar}>
                </AvatarSelector>
                <InputItem onChange={el => this.onChange('title', el)}>招聘职位</InputItem>
                <InputItem onChange={el => this.onChange('company', el)}>公司名称</InputItem>
                <InputItem onChange={el => this.onChange('money', el)}>职位薪资</InputItem>
                <TextareaItem onChange={el => this.onChange('desc', el)}
                              title="职位要求"
                              rows={3}
                              autoHeight
                />
                <WhiteSpace/>
                <WingBlank>
                    <Button type="primary" onClick={() => {
                        this.props.update(this.state);
                    }}>保存</Button>
                </WingBlank>
            </div>
        )
    }
}

export default BossInfo;