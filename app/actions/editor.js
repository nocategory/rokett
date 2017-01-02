// @flow

export const SET_CONTENT = 'SET_CONTENT';

/**
 * [setEditorContent]
 * @param {[type]} content  [contents of the file]
 * @param {[type]} filePath [file path of the file]
 */
export function setEditorContent(content, filePath) {
  return {
    type: SET_CONTENT,
    content,
    filePath,
  };
}
