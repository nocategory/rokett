// @flow
import React, { Component } from 'react';
import s from './Modal.css';

export default class Modal extends Component {

  props: {
    modalOverlayClick: () => void,
  };

  render() {
    const { modalOverlayClick } = this.props;

    return (
      <div className="flex-vertical">
        <div className={s.overlay} onClick={modalOverlayClick}>
          <div className={s.modal}>
            <p>test</p>
          </div>
        </div>
      </div>
    );
  }
}
