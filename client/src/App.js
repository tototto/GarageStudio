import React, {Fragment, useEffect} from 'react';
import './App.css';
import Landing from './components/layout/Landing';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Register from './components/layout/Register';
import Profile from './components/Internal/Profile';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import combinedReducer from './redux/allReducer/combinedReducer';
import Alert from './components/Notification/Alert';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import authUserToken from './utils/authToken';

const middleware = [thunk];

// Create Redux Store (App state management)
export const store = createStore(
  combinedReducer, composeWithDevTools(applyMiddleware(...middleware))
);

const App = () => {

  useEffect(() => { 
    
    // Auth User
    if(localStorage.getItem('token')) 
      authUserToken();

  }, []);

  return (
    <Provider store={store}>
      <Router>
      <Alert />
        <Fragment>
          <Switch>
            <Route exact path="/" component={Landing}></Route>
            <Route exact path="/Register" component={Register}></Route>
            <Route exact path="/Profile" component={Profile}></Route>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
