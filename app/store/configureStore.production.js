// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { autoRehydrate } from 'redux-persist';
import rootReducer from '../reducers';

const history = createBrowserHistory();
const enhancers = [];
const router = routerMiddleware(history);

enhancers.push(applyMiddleware(thunk, router));
enhancers.push(autoRehydrate());

function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancers); // eslint-disable-line
}

export default { configureStore, history };
