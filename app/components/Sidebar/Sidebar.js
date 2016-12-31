// @flow
import React, { Component } from 'react';
import { VelocityComponent } from 'velocity-react';
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import s from './Sidebar.css';
import Modal from '../Modal/Modal';

const settingsButton = {
  fontSize: '1.5em',
};

export default class Sidebar extends Component {

  render() {
    let settingsModal;
    if (this.props.modalVisible) {
      settingsModal = (
        <VelocityComponent animation="transition.fadeIn" duration={500} runOnMount>
          <Modal />
        </VelocityComponent>
      );
    }

    return (
      <div className={s.sidebarWrapper}>
        <div className={s.sidebar}>
          <div className={s.sidebarButtons}>
            <hr />
            <i className="fa fa-cog" aria-hidden="true" style={settingsButton} onClick={this.props.modalOverlayClick} />
          </div>
        </div>
        { settingsModal }
      </div>
    );
  }
}
