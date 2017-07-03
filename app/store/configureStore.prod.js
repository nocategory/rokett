// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
// $FlowIssue
import { autoRehydrate } from 'redux-persist';
import rootReducer from '../reducers';

const history = createBrowserHistory();
const enhancers = [];
const router = routerMiddleware(history);

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  /* eslint-enable */

enhancers.push(applyMiddleware(thunk, router));
enhancers.push(autoRehydrate());

// $FlowIssue
const enhancer = composeEnhancers(...enhancers);

function configureStore(initialState: Object) {
  return createStore(rootReducer, initialState, enhancer); // eslint-disable-line
}

export default { configureStore, history };
