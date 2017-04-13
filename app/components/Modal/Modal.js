// @flow
import React, { Component } from 'react';
import Animate from 'rc-animate';
import s from './Modal.css';

export default class Modal extends Component {
  props: {
    toggleModal: () => void
  };

  render() {
    const { toggleModal, modalVisible } = this.props;
    if (!modalVisible) return null;

    return (
      <Animate animation={{ }}>
      <div className="flex-vertical" onClick={toggleModal}>
        <div className={s.modal}>
          <div className="flex-horizontal h100">
            <div className={s.sidebarWrapper}>
              <div className={s.sidebar}>
                <div className={s.sectionTitle}>
                  Editor settings
                </div>
                <div className={s.sectionTitle}>
                  UI settings
                </div>
                <div className={s.sectionTitle}>
                  User settings
                </div>
              </div>
            </div>
            <div className={s.contentWrapper}>
              <div className={s.content}>
                <p><b>Sorry, not ready yet!</b></p>
                <span>have some tea meanwhile</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Animate>
    );
  }
}
