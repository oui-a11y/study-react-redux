import React from 'react';
import {Redirect} from 'react-router-dom';
import Logo from '../../component/logo/logo';
import {List, InputItem, WhiteSpace, Button, WingBlank} from 'antd-mobile';
import {connect} from 'react-redux';
import {login} from "../../redux/user.redux";


function WrapperHello(Comp) {
    class WarpComp extends Comp {
        componentDidMount() {
            console.log('这是高阶组件新增生命周期')
        }
        render(){
            return　<Comp></Comp>
        }
    }

    // class CompHello extends React.Component {
    //     render() {
    //         console.log(this.props);
    //         return (
    //             <div>
    //                 <span>这是高阶组件特有的元素</span>
    //                 <Comp></Comp>
    //             </div>
    //         )
    //     }
    // }

    return WarpComp
}

// @WrapperHello
// class Hello extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             one: 1
//         }
//     }
//
//     render() {
//         return <h2>这是hello</h2>
//     }
// }


// Hello = WrapperHello(Hello);


@connect(
    state => state.user,
    {login}
)
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: ''
        };
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    register() {
        this.props.history.push('/register');
    }

    handleLogin() {
        this.props.login(this.state);
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    render() {
        return (
            <div>
                {/*<Hello></Hello>*/}
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo></Logo>
                <WingBlank>
                    {this.props.msg ? <span className='error-msg'>{this.props.msg}</span> : null}
                    <List>
                        <InputItem onChange={v => this.handleChange('user', v)}>用户</InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login