// @flow
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';

export default () => (
  <Router>
    {/* $FlowFixMe => https://github.com/facebook/flow/issues/1964 */}
    <App>
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </App>
  </Router>
);
