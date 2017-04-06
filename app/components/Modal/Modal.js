// @flow
import React, { Component } from 'react';
import { VelocityComponent } from 'velocity-react';
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import s from './Modal.css';

export default class Modal extends Component {
  props: {
    toggleModal: () => void
  };

  render() {
    const { toggleModal, modalVisible } = this.props;
    if (!modalVisible) return null;

    return (
      <VelocityComponent animation={modalVisible ? 'transition.slideDownIn' : 'transition.fadeOut'} duration={500} runOnMount runOnUnmount>
        <div className={`${s.overlay} flex-vertical`} onClick={toggleModal}>
          <div className={s.modal}>
            <p><b>Sorry, not ready yet!</b></p>
            <span>have some tea meanwhile</span>
          </div>
        </div>
      </VelocityComponent>
    );
  }
}
