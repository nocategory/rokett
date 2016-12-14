// @flow
import { HIDE_OVERLAY } from '../actions/modal';

const initialState = {
  x: 1,
};


export default function modal(state = initialState, action) {
  switch (action.type) {
    case HIDE_OVERLAY:
      /* return Object.assign({}, state, {
        hiddenOverlay: true
      });*/
      return state;
    default:
      return initialState;
  }
}
