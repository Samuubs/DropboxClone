import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Main from '../src/pages/main';
import Box from '../src/pages/box';

const Routes = () => {
  return (
      <BrowserRouter>
          <Switch>
              <Route component={Main} path="/" exact />
              <Route component={Box} path="/box/:id" />
          </Switch>
      </BrowserRouter>   
  )
}

export default Routes;