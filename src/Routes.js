import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Login from './pages/Login';
import Wallet from './pages/Wallet';

const Routes = () => (
  <BrowserRouter>
    <Route component={ Login } path="/" exact />
    <Route path="/carteira" component={ Wallet } />
  </BrowserRouter>
);

export default Routes;
