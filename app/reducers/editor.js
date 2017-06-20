// @flow
// import chokidar from 'chokidar';
import { SET_CONTENT, SET_NEWCONTENT, SET_FOLDERPATH, SET_EDITORMOUNTED } from '../actions/editor';
import dirTree from '../directory-tree';


const initialState = {
  initialContent: '',
  currentFilePath: '',
  currentFolderPath: '',
  editorMode: '',
  currentContent: '',
  saved: true,
  editorIsMounted: false,
};


export default function editor(state: Object = initialState, action: Object) {
  switch (action.type) {
    case SET_CONTENT: {
      return { ...state,
        initialContent: action.initialContent,
        currentFilePath: action.filePath,
        editorMode: '',
        currentContent: action.initialContent,
        saved: true
      };
    }

    case SET_NEWCONTENT: {
      let savedBool;
      if (action.currentContent === state.initialContent) {
        savedBool = true;
      } else {
        savedBool = false;
      }
      return { ...state,
        currentContent: action.currentContent,
        saved: savedBool
      };
    }

    case SET_FOLDERPATH: {
      return { ...state, currentFolderPath: action.currentFolderPath };
    }

    case SET_EDITORMOUNTED: {
      return { ...state, editorIsMounted: true };
    }

    default: {
      // set editor mount status to false at the start of the app
      if (state.editorIsMounted) return { ...state, editorIsMounted: false };
      return state;
    }
  }
}
