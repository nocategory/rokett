// @flow

export const TOGGLE_SETTINGS = 'TOGGLE_SETTINGS';
export const TOGGLE_FILETREE = 'TOGGLE_FILETREE';
export const SELECT_SECTION = 'SELECT_SECTION';

export function toggleSettings() {
  return { type: TOGGLE_SETTINGS };
}

export function toggleFileTree() {
  return { type: TOGGLE_FILETREE };
}

export function selectSection(sectionName) {
  return {
    type: SELECT_SECTION,
    sectionName,
  };
}
