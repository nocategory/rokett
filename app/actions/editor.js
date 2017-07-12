// @flow

export const SET_CONTENT = 'SET_CONTENT';
export const SET_NEWCONTENT = 'SET_NEWCONTENT';
export const SET_FOLDERPATH = 'SET_FOLDERPATH';
export const SET_EDITORMOUNTED = 'SET_EDITORMOUNTED';
export const NEW_TAB = 'NEW_TAB';
export const TAB_CLICK = 'TAB_CLICK';
export const TAB_CLOSE = 'TAB_CLOSE';
export const SAVE = 'SAVE';

/**
 * [setEditorContent]
 * @param {[type]} content  [contents of the file]
 * @param {[type]} filePath [file path of the file]
 */
export function setEditorContent(initialContent: string, filePath: string) {
  return {
    type: SET_CONTENT,
    initialContent,
    filePath,
  };
}

export function editorOnChange(currentContent: string) {
  return {
    type: SET_NEWCONTENT,
    currentContent,
  };
}

export function setActiveFolder(currentFolderPath: string, currentFolderJSON: Object) {
  return {
    type: SET_FOLDERPATH,
    currentFolderPath,
    currentFolderJSON,
  };
}

export function setEditorMount(languages: Object) {
  return {
    type: SET_EDITORMOUNTED,
    languages,
  };
}

export function newTab(filePath: ?string) {
  return {
    type: NEW_TAB,
    filePath,
  };
}

export function tabClick(filePath: ?string) {
  return {
    type: TAB_CLICK,
    filePath,
  };
}

export function tabClose(filePath: ?string) {
  return {
    type: TAB_CLOSE,
    filePath,
  };
}

export function saveFileFunc() {
  return {
    type: SAVE,
  };
}
