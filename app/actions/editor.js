// @flow

export const SET_CONTENT = 'SET_CONTENT';
export const SET_NEWCONTENT = 'SET_NEWCONTENT';
export const SET_FOLDERPATH = 'SET_FOLDERPATH';

/**
 * [setEditorContent]
 * @param {[type]} content  [contents of the file]
 * @param {[type]} filePath [file path of the file]
 */
export function setEditorContent(initialContent, filePath) {
  return {
    type: SET_CONTENT,
    initialContent,
    filePath,
  };
}

export function editorOnChange(currentContent) {
  return {
    type: SET_NEWCONTENT,
    currentContent,
  };
}

export function setActiveFolder(currentFolderPath) {
  console.log('ACTION');
  return {
    type: SET_FOLDERPATH,
    currentFolderPath,
  };
}
