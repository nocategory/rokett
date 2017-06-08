// @flow

export const TOGGLE_SETTINGS = 'TOGGLE_SETTINGS';
export const SELECT_SECTION = 'SELECT_SECTION';

export function toggleSettings() {
  return { type: TOGGLE_SETTINGS };
}

export function selectSection(sectionName: string) {
  return {
    type: SELECT_SECTION,
    sectionName,
  };
}
