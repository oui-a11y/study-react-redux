import React from 'react';
import {Grid, List} from 'antd-mobile';
import PropTypes from 'prop-types';


class AvatarSelector extends React.Component {
    static PropTypes = {
        selectAvatar:PropTypes.func.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
            icon: ''
        };
        this.selectAvatarOne = this.selectAvatarOne.bind(this);
    }

    selectAvatarOne(el) {
        this.setState(el);
        this.props.selectAvatar(el);
    }

    render() {
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'.split(',').map(v => ({
            icon: require(`../img/${v}.png`),
            text: v
        }));
        const Header = this.state.icon ? (<div>
            <span>已选择头像:</span>
            <img style={{width:20}} src={this.state.icon} alt=""/>
        </div>) : null;
        return (
            <div>
                <List renderHeader={() => Header}>
                    {/*<Grid data={avatarList} columnNum={4} onClick={el => {*/}
                    {/*this.setState(el);*/}

                    {/*this.props.selectAvatar(el)*/}
                    {/*}}/>*/}
                    <Grid data={avatarList} columnNum={4} onClick={this.selectAvatarOne}/>
                </List>
            </div>
        )
    }
}

export default AvatarSelector;