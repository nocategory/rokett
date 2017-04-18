// @flow

export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const SELECT_SECTION = 'SELECT_SECTION';

export function toggleModal() {
  return { type: TOGGLE_MODAL };
}

export function selectSection(sectionName) {
  return {
    type: SELECT_SECTION,
    sectionName,
  };
}
