import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './components/pages/home-page';
import LoginPage from './components/pages/login-page';

import 'semantic-ui-css/semantic.min.css';

const App = () => {
  return (
  <div className="ui container">
    <Route path="/" exact component={ HomePage } />
    <Route path="/login" exact component={ LoginPage } />
  </div>
  );
};

export default App;
