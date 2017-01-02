// @flow
import { TOGGLE_MODAL } from '../actions/modal';

const initialState = {
  modalVisible: false,
};

export default function modal(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MODAL:
      console.log('w');
      return Object.assign({}, state, {
        modalVisible: !state.modalVisible
      });
    default:
      return state;
  }
}
