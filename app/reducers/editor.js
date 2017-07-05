// @flow
import fileExtension from 'file-extension';
import { SET_CONTENT, SET_NEWCONTENT, SET_FOLDERPATH, SET_EDITORMOUNTED, SET_NEWMODEL } from '../actions/editor';

const initialState = {
  initialContent: '',
  currentFilePath: '',
  currentFolderPath: '',
  editorLang: '',
  currentContent: '',
  saved: true,
  editorIsMounted: false,
};

const getEditorLanguage = (state, fPath) => {
  const fExt = `.${fileExtension(fPath)}`;
  const langs = state.languages;
  for (let x = 0; x < langs.length; x++) {
    for (let y = 0; y < langs[x].extensions.length; y++) {
      if (langs[x].extensions[y] === fExt) {
        return langs[x].id;
      }
    }
  }
};


export default function editor(state: Object = initialState, action: Object) {
  switch (action.type) {
    case SET_CONTENT: {
      const editorLang = getEditorLanguage(state, action.filePath);
      return { ...state,
        initialContent: action.initialContent,
        currentFilePath: action.filePath,
        editorLang,
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
      return { ...state,
        editorIsMounted: true,
        languages: action.languages
      };
    }

    case SET_NEWMODEL: {
      const monaco = action.monaco;
      console.log(state.currentContent);
      const model = monaco.editor.createModel([
        state.currentContent
      ].join('\n'),
  			'javascript'
  		);
      const x = [];
      console.log(model);
      return { ...state,
        model: x.push(model)
      };
    }

    default: {
      // set editor mount status to false at the start of the app
      if (state.editorIsMounted) return { ...state, editorIsMounted: false };
      return state;
    }
  }
}
