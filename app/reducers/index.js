// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import modal from './modal';
import editor from './editor';

const rootReducer = combineReducers({
  modal,
  editor,
  routing,
});

export default rootReducer;
