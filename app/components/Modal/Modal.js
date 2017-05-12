// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { spring } from 'react-motion';
import Transition from 'react-motion-ui-pack';
import { translate } from 'react-i18next';
import s from './Modal.css';

@translate()
export default class Modal extends Component {
  props: {
    toggleModal: () => void,
    selectSection: () => void
  };

  render() {
    const { toggleModal, modalVisible, selectSection, selectedSection, t } = this.props;
    // @TODO: actual settings with section names n stuff
    return (
      <Transition
        component={false} // don't use a wrapping component
        enter={{
            // translateY: 0,
          scale: 1,
          opacity: 1,
        }}
        leave={{
            // translateY: -window.innerHeight,
          scale: 0.8,
          opacity: 0,
        }}
      >
        {modalVisible &&
        <div className={s.modal} key={1}>
          <div className="flex-vertical h100">
            <div className={s.sidebarWrapper}>
              <div className={s.sidebar}>
                <div className={s.sectionWrapper}>
                  <div className={s.sectionLink}>
                    <div className={selectedSection === 'test1' ? classNames(s.sectionHeader, s.selectedSectionHeader) : s.sectionHeader} onClick={() => selectSection('test1')}>{/* t('x') */}</div>
                  </div>
                  <div className={s.sectionLink}>
                    <div className={selectedSection === 'test2' ? classNames(s.sectionHeader, s.selectedSectionHeader) : s.sectionHeader} onClick={() => selectSection('test2')}>UI</div>
                  </div>
                  <div className={s.sectionLink}>
                    <div className={selectedSection === 'test3' ? classNames(s.sectionHeader, s.selectedSectionHeader) : s.sectionHeader} onClick={() => selectSection('test3')}>User</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={s.contentWrapper}>
              <div className={s.content}>
                {/* @TODO: add other sections */}
                {selectedSection === 'test1' ?
                  <p>
                    <b>Sorry, not ready yet! 1</b>
                  </p> : selectedSection === 'test2' ?
                    <p>
                          <b>Sorry, not ready yet! 2</b>
                        </p> :
                        <p>fail</p>
                    }
              </div>
            </div>
            {/* <div className={s.exitModal}>
                  <div className={classNames(s.exitModalIcon)} />
                </div>*/}
          </div>
        </div>
        }
      </Transition>
    );
  }
}
