import React from 'react';
import {Card, WingBlank, WhiteSpace} from 'antd-mobile';


class UserCard extends React.Component {
    render() {
        console.log(this.props.userList);
        return (
            <div>
                <WingBlank size="lg">
                    <WhiteSpace size="lg"/>
                    {this.props.userList.map(item => (
                        item.avatar ? (
                            <Card key={item._id}>
                                <Card.Header
                                    title={item.user}
                                    thumb={require(`../img/${item.avatar}.png`)}
                                    extra={<span>{item.title}</span>}
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