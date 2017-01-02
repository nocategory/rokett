// @flow
import React, { Component } from 'react';
import { VelocityComponent } from 'velocity-react';
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import s from './Modal.css';
import logo from '../../quarkz_newlogo_dark.png';

export default class Modal extends Component {
  render() {
    if (!this.props.modalVisible) return null;
    const { toggleModal } = this.props;

    return (
      <VelocityComponent animation={this.props.modalVisible ? 'transition.slideDownIn' : 'transition.fadeOut'} duration={500} runOnMount>
        <div className={`${s.overlay} flex-vertical`} onClick={toggleModal}>
          <div className={s.modal}>
            <img role="presentation" src={logo} />
          </div>
        </div>
      </VelocityComponent>
    );
  }
}
