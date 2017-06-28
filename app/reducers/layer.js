// @flow
import { TOGGLE_SETTINGS, SELECT_SECTION, TOGGLE_FILETREE } from '../actions/layer';

const initialState = {
  settingsVisible: false,
  selectedSection: 1,
  fileTreeVisible: true
};

export default function layer(state: Object = initialState, action: Object) {
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
