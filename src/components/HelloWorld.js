import React, {Component, PropTypes} from 'react';

export default class HelloWorld extends Component {

    render(){
        let {message} = this.props;
        return(
            <div>{message}</div>
        );
    }

}

HelloWorld.propTypes= {
    message: PropTypes.string
}
