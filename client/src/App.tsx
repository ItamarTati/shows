import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Details from './pages//details/Details';
import NotFound from './pages/not-found/NotFound';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: '/graphql',
});

const App: React.FC = () => {
    return (
      <ApolloProvider client={client}>
        <div className='App'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/not-found' component={NotFound} />
            <Route path='/:_id' component={Details} />
          </Switch>
        </div>
        </ApolloProvider>
      );
    }
    
  

export default withRouter(App);