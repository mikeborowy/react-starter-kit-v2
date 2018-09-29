import React, {Component} from 'react';
import { hot } from 'react-hot-loader';
import HelloWorld from './helloWorld/HelloWorld';

class App extends Component{

    render(){
        return(
             <HelloWorld message="Hello World !!!"/>
        );
    }
} 

export default hot(module)(App);
