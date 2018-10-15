import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './index.scss';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Learnmore from './components/Learnmore';
import PassForgoten from './components/Auth/PassForgoten';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';


const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
});

const Root = () => (
    <Router>
    <div className="app-container">
    <Switch>
        <Route 
            path="/signup"
            exact 
            render={() => <Signup />}/>
        <Route path="/home" component={Home} />
        <Route path="/learnmore" component={Learnmore} />
        <Route path="/forgetpass" component={PassForgoten} />
        
        <Route 
            path="/login" 
            render={() => <Login />}/>
        <Redirect to="/signup" />
    </Switch>
    <div className="row-copyright">Copyright 2018</div>
    </div>
    </Router>
);

ReactDOM.render(
<ApolloProvider client={client}>
    <Root />
</ApolloProvider>, 
document.getElementById('root'));