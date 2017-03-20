// @flow
import React, { Component } from 'react';
import { VelocityComponent } from 'velocity-react';
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import s from './Modal.css';
import tea from '../../dist/tea.png';

export default class Modal extends Component {
  render() {
    if (!this.props.modalVisible) return null;
    const { toggleModal } = this.props;

    return (
      <VelocityComponent animation={this.props.modalVisible ? 'transition.slideDownIn' : 'transition.fadeOut'} duration={500} runOnMount>
        <div className={`${s.overlay} flex-vertical`} onClick={toggleModal}>
          <div className={s.modal}>
            <img className={s.modalTea} role="presentation" src={tea} />
            <p><b>Sorry, not ready yet!</b></p>
            <span>have some tea meanwhile</span>
          </div>
        </div>
      </VelocityComponent>
    );
  }
}
