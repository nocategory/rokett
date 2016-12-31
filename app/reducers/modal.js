// @flow
import { HIDE_OVERLAY } from '../actions/modal';

const is = {
  modalVisible: true,
};

export default function modal(state = is, action) {
  switch (action.type) {
    case HIDE_OVERLAY:
      console.log('REDUCER!!');
      let x = Object.assign({}, state, {
        modalVisible: !state.modalVisible
      });
      console.log(x)
      return Object.assign({}, state, {
        modalVisible: !state.modalVisible
      });
    default:
      console.log('REDUCER 2');
      return state;
  }
}
