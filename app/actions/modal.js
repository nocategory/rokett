// @flow

export const TOGGLE_MODAL = 'TOGGLE_MODAL';

export function modalOverlayClick() {
  console.log('ACTION');
  return { type: TOGGLE_MODAL };
}
