// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import layer from './layer';
import editor from './editor';

const rootReducer = combineReducers({
  layer,
  editor,
  routing,
});

export default rootReducer;
