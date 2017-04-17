import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import { syncHistoryWithStore } from 'react-router-redux';
import { persistStore } from 'redux-persist';
import { localStorage } from 'redux-persist/storages';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import './app.global.css';

const store = configureStore();
persistStore(store, { storage: localStorage });
const history = syncHistoryWithStore(hashHistory, store);

console.log("AYY!");

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
