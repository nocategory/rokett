// @flow
import { TOGGLE_SETTINGS, TOGGLE_FILETREE, SELECT_SECTION } from '../actions/layer';

const initialState = {
  settingsVisible: false,
  fileTreeVisible: false,
  selectedSection: 1,
};

export default function modal(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SETTINGS:
      return { ...state, settingsVisible: !state.settingsVisible };

    case TOGGLE_FILETREE:
      return { ...state, fileTreeVisible: !state.fileTreeVisible };

    case SELECT_SECTION:
      console.log(action.sectionName);
      return { ...state, selectedSection: action.sectionName };

    default:
      return state;
  }
}
