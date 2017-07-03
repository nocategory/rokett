// @flow

export const TOGGLE_SETTINGS = 'TOGGLE_SETTINGS';
export const TOGGLE_FILETREE = 'TOGGLE_FILETREE';
export const SELECT_SECTION = 'SELECT_SECTION';
export const TOGGLE_TREEMODAL = 'TOGGLE_TREEMODAL';

export function toggleSettings() {
  return { type: TOGGLE_SETTINGS };
}

export function toggleFileTree() {
  return { type: TOGGLE_FILETREE };
}

export function selectSection(sectionName: string) {
  return {
    type: SELECT_SECTION,
    sectionName
  };
}

export function toggleTreeModal(actionType: ?string, e: ?SyntheticMouseEvent, node: ?Object) {
  console.log(actionType);
  console.log(e);
  console.log(node);
  return {
    type: 'TOGGLE_TREEMODAL',
    actionType,
    node
  };
}
