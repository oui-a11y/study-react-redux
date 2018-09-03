import React from 'react';
import {Card, WingBlank, WhiteSpace} from 'antd-mobile';
import {withRouter} from 'react-router-dom'


@withRouter
class UserCard extends React.Component {
    constructor(props){
        super(props)
    }
    clickPro(item){
        this.props.history.push(`/chat/${item._id}`)
    }
    render() {
        console.log(this.props);
        return (
            <div>
                <WingBlank size="lg">
                    <WhiteSpace size="lg"/>
                    {this.props.userList.map(item => (
                        item.avatar ? (
                            <Card key={item._id}
                                  onClick={()=>this.clickPro(item)}
                            >
                                <Card.Header
                                    title={item.user}
                                    thumb={require(`../img/${item.avatar}.png`)}
                                    extra={<span >{item.title}</span>}
                                />
                                <Card.Body>
                                    {item.type === 'boss' ? <div>公司:{item.company}</div> : null}
                                    {
                                        item.desc.split('\n').map(v => (
                                            <div key={v}>{v}</div>
                                        ))
                                    }
                                    {item.type === 'boss' ? <div>薪资:{item.money}</div> : null}
                                </Card.Body>
                            </Card>
                        ) : null
                    ))}

                    <WhiteSpace size="lg"/>
                </WingBlank>
            </div>
        )
    }
}

export default UserCard;