// @flow
import React, { Component } from 'react';
import s from './Modal.css';

export default class Modal extends Component {
  render() {
    return (
      <div className="flex-vertical">
        <div className={s.overlay}>
          <div className={s.modal}>
            <p>test</p>
          </div>
        </div>
      </div>
    );
  }
}
