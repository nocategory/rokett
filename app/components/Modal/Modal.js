// @flow
import React, { Component } from 'react';
import Animate from 'rc-animate';
import classNames from 'classnames';
import s from './Modal.css';

export default class Modal extends Component {
  props: {
    toggleModal: () => void
  };

  render() {
    const { toggleModal, modalVisible } = this.props;
    if (!modalVisible) { return null; }

    // onClick={toggleModal}
    return (
      <Animate animation={{}}>
        <div className="flex-vertical">
          <div className={s.modal}>
            <div className="flex-horizontal h100">
              <div className={s.sidebarWrapper}>
                <div className={s.sidebar}>
                  <div className={s.sectionLink}>
                    <div className={s.sectionHeader}>Editor settings</div>
                    <div className={classNames(s.sectionSpan, s.selectedSectionSpan)}>test12</div>
                    <div className={s.sectionSpan}>test2</div>
                  </div>
                  <div className={s.sectionLink}>
                    <div className={s.sectionHeader}>UI settings</div>
                    <div className={s.sectionSpan}>test1</div>
                    <div className={s.sectionSpan}>test2</div>
                  </div>
                  <div className={s.sectionLink}>
                    <div className={s.sectionHeader}>User settings</div>
                    <div className={s.sectionSpan}>test1</div>
                    <div className={s.sectionSpan}>test2</div>
                  </div>
                </div>
              </div>
              <div className={s.contentWrapper}>
                <div className={s.content}>
                  <p>
                    <b>Sorry, not ready yet! 1</b>
                  </p>
                  <p>
                    <b>Sorry, not ready yet! 2</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Animate>
    );
  }
}
