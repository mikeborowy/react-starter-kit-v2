import React, {Component} from 'react';
import PropTypes from 'prop-types';
import imgWorld from '../../assets/world.jpg'; 

export default class HelloWorld extends Component {

    render(){
        let {message} = this.props;
        return (
            <div className="hello-world">
                <h1>{message}</h1>
                <img src={imgWorld} alt="World"/>
            </div>
        );
    }
}

HelloWorld.propTypes = {
    message: PropTypes.string
};
