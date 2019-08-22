import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './components/pages/home-page';
import LoginPage from './components/pages/login-page';

const App = () => {
  return (
  <div>
    <Route exact path="/" component={ HomePage } />
    <Route exact path="/login" component={ LoginPage } />
  </div>
  );
};

export default App;
