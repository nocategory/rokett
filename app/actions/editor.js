// @flow

export const SET_CONTENT = 'SET_CONTENT';
export const SET_NEWCONTENT = 'SET_NEWCONTENT';
export const SET_FOLDERPATH = 'SET_FOLDERPATH';
export const SET_EDITORMOUNTED = 'SET_EDITORMOUNTED';

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

export function setActiveFolder(currentFolderPath: string) {
  return {
    type: SET_FOLDERPATH,
    currentFolderPath,
  };
}

export function setEditorMount(languages: Object) {
  return {
    type: SET_EDITORMOUNTED,
    languages,
  };
}
