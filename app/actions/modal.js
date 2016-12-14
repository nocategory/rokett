// @flow

export const HIDE_OVERLAY = 'HIDE_OVERLAY';

export function modalOverlayClick() {
  console.log('ACTION');
  return { type: HIDE_OVERLAY };
}
