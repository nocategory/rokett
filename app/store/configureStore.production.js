// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import { autoRehydrate } from 'redux-persist';
import rootReducer from '../reducers';

import * as modalActions from '../actions/modal';
import * as editorActions from '../actions/editor';


const actionCreators = {
  ...modalActions,
  ...editorActions,
  push,
};

const router = routerMiddleware(hashHistory);

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
    actionCreators,
  }) :
  compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, router),
  autoRehydrate(),
);

export default function configureStore(initialState: Object) {
  return createStore(rootReducer, initialState, enhancer);
}
