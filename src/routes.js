import * as React from 'react';
import * as ReactRouter from 'react-router';
//Components
import App from './components/App';
import HelloWorld from './components/helloWorld/HelloWorld';

export default (
    <ReactRouter.Route path="/" component={App}>
        <ReactRouter.IndexRoute component={HelloWorld}/>
    </ReactRouter.Route>
);
