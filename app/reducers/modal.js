// @flow
import { TOGGLE_MODAL, SELECT_SECTION } from '../actions/modal';

const initialState = {
  modalVisible: false,
  selectedSection: 1,
};

export default function modal(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MODAL:
      return { ...state, modalVisible: !state.modalVisible };
    case SELECT_SECTION:
      console.log(action.sectionName);
      return { ...state, selectedSection: action.sectionName };
    default:
      return state;
  }
}
