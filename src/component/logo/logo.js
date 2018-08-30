import React from 'react';
import loginImg from './job.png';
import './logo.css';

class Logo extends React.Component{
    render(){
        return(
            <div className='login-container'>
                <img src={loginImg} alt=""/>
            </div>
        )
    }
}
export default Logo;