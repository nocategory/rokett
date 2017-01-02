// @flow

/** ace editor stuff for editorMode */
import * as ace from 'brace';
import 'brace/ext/modelist';

import { SET_CONTENT, SET_NEWCONTENT, SET_FOLDERPATH } from '../actions/editor';
import dirTree from '../directory-tree';

const modelist = ace.acequire('ace/ext/modelist');


const initialState = {
  initialContent: '',
  currentFilePath: '',
  editorMode: '',
  currentContent: '',
  saved: true,
  currentFolderJSON: '',
};

export default function editor(state = initialState, action) {
  switch (action.type) {
    case SET_CONTENT:
      // returns 'ace/mode/x'
      let mode = modelist.getModeForPath(action.filePath).mode;
      mode = mode.substring(mode.indexOf('mode/') + 'mode/'.length, mode.length);
      console.log(mode);
      return Object.assign({}, state, {
        initialContent: action.initialContent,
        currentFilePath: action.filePath,
        editorMode: mode,
        currentContent: action.initialContent,
        saved: true,
      });
    case SET_NEWCONTENT:
      let savedBool;
      if (action.currentContent === state.initialContent) {
        savedBool = true;
      }
      else {
        savedBool = false;
      }
      return Object.assign({}, state, {
        currentContent: action.currentContent,
        saved: savedBool,
      });
    case SET_FOLDERPATH:
      console.log('REDUCER');
      return Object.assign({}, state, {
        currentFolderJSON: dirTree(action.currentFolderPath),
      });
    default:
      return state;
  }
}
