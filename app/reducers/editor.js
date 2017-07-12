// @flow
import fileExtension from 'file-extension';
import { SET_CONTENT, SET_NEWCONTENT, SET_FOLDERPATH, SET_EDITORMOUNTED, NEW_TAB, TAB_CLICK, TAB_CLOSE, SAVE } from '../actions/editor';

const initialState = {
  initialContent: '',
  currentFilePath: '',
  currentFolderPath: '',
  editorLang: '',
  currentContent: '',
  model: null,
  saved: true,
  editorIsMounted: false,
  currentFolderJSON: null,
  tabs: [],
  activeTabFilePath: ''
};


export default function editor(state: Object = initialState, action: Object) {
  switch (action.type) {
    case NEW_TAB: {
      for (let i = 0; i < state.tabs.length; i++) {
        if (state.tabs[i].path === action.filePath) {
          return { ...state };
        }
      }
      return { ...state,
        tabs: [...state.tabs, {
          active: true,
          path: action.filePath
        }]
      };
    }

    case TAB_CLICK: {
      return { ...state,
        activeTabFilePath: action.filePath
      };
    }

    case TAB_CLOSE: {
      const t = state.tabs;
      for (let y = 0; y < t.length; y++) {
        if (state.tabs[y].path === action.filePath) {
          t.splice(y, 1);
        }
      }
      return { ...state,
        tabs: t
      };
    }

    case SAVE: {
      return { ...state, saveFile: !state.saveFile };
    }

    case SET_CONTENT: {
      return { ...state,
        initialContent: action.initialContent,
        currentFilePath: action.filePath,
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
      return { ...state, currentFolderPath: action.currentFolderPath, currentFolderJSON: action.currentFolderJSON };
    }

    case SET_EDITORMOUNTED: {
      return { ...state,
        editorIsMounted: true,
        languages: action.languages
      };
    }

    default: {
      // set editor mount status to false at the start of the app
      if (state.editorIsMounted) return { ...state, editorIsMounted: false };
      return state;
    }
  }
}
