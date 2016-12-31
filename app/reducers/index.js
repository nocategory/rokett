// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import modal from './modal';

const rootReducer = combineReducers({
  modal,
  routing
});

export default rootReducer;
