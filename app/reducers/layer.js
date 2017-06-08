// @flow
import { TOGGLE_SETTINGS, SELECT_SECTION } from '../actions/layer';

const initialState = {
  settingsVisible: false,
  selectedSection: 1
};

export default function layer(state: Object = initialState, action: Object) {
  switch (action.type) {
    case TOGGLE_SETTINGS:
      return { ...state, settingsVisible: !state.settingsVisible };

    case SELECT_SECTION:
      console.log(action.sectionName);
      return { ...state, selectedSection: action.sectionName };

    default:
      return state;
  }
}
