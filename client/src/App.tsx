import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Details from './pages//details/Details';
import NotFound from './pages/not-found/NotFound';





const App: React.FC = () => {
    return (
        <div className='App'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/not-found' component={NotFound} />
            <Route path='/:_id' component={Details} />
          </Switch>
        </div>
      );
    }
    
  

export default withRouter(App);