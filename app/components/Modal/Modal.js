// @flow
import React, { Component } from 'react';
import { VelocityComponent } from 'velocity-react';
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import s from './Modal.css';

export default class Modal extends Component {
  props: {
    modalOverlayClick: () => void,
  }

  render() {
    if (!this.props.modalVisible) return null;
    const { modalOverlayClick } = this.props;

    return (
      <VelocityComponent animation={this.props.modalVisible ? 'transition.slideDownIn' : 'transition.fadeOut'} duration={500} runOnMount>
        <div className={`${s.overlay} flex-vertical`} onClick={modalOverlayClick}>
          <div className={s.modal}>
            <p>test</p>
          </div>
        </div>
      </VelocityComponent>
    );
  }
}
