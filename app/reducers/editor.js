// @flow

/** ace editor stuff for editorMode */
import * as ace from 'brace';
import 'brace/ext/modelist';

import { SET_CONTENT } from '../actions/editor';

const modelist = ace.acequire('ace/ext/modelist');

const initialState = {
  editorContent: '',
  currentFilePath: '',
  editorMode: '',
};

export default function editor(state = initialState, action) {
  switch (action.type) {
    case SET_CONTENT:
      return Object.assign({}, state, {
        editorContent: action.content,
        currentFilePath: action.filePath,
        editorMode: modelist.getModeForPath(action.filePath).mode,
      });
    default:
      return state;
  }
}
