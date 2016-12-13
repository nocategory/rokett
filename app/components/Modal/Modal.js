// @flow
import React, { Component } from 'react';
import s from './Modal.css';

export default class Modal extends Component {

  handleOverlayClick = () => {

  }

  render() {
    return (
      <div className="flex-vertical">
        <div className={s.overlay} onClick={this.handleOverlayClick}>
          <div className={s.modal}>
            <p>test</p>
          </div>
        </div>
      </div>
    );
  }
}
