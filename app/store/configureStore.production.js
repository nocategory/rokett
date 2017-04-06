// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { autoRehydrate } from 'redux-persist';
import rootReducer from '../reducers';

const enhancers = [];
const router = routerMiddleware(hashHistory);

enhancers.push(applyMiddleware(thunk, router));
enhancers.push(autoRehydrate());

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancers); // eslint-disable-line
}
