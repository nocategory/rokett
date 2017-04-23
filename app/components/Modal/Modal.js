// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { spring } from 'react-motion';
import Transition from 'react-motion-ui-pack';
import s from './Modal.css';

export default class Modal extends Component {
  props: {
    toggleModal: () => void,
    selectSection: () => void
  };

  render() {
    const { toggleModal, modalVisible, selectSection, selectedSection } = this.props;
    // @TODO: actual settings with section names n stuff
    return (
      <div className="flex-vertical" onClick={() => toggleModal()}>
        <Transition
          component={false} // don't use a wrapping component
          enter={{
            opacity: 1,
            translateY: 100,
          }}
          leave={{
            opacity: 0,
            translateY: 0,
          }}
        >
          {modalVisible &&
            <div className={s.modal} key={1}>
              <div className="flex-horizontal h100">
                <div className={s.sidebarWrapper}>
                  <div className={s.sidebar}>
                    <div className={s.sectionWrapper}>
                      <div className={s.sectionLink}>
                        <div className={s.sectionHeader}>Editor settings</div>
                        <div className={selectedSection === 'test1' ? classNames(s.sectionSpan, s.selectedSectionSpan) : s.sectionSpan} onClick={() => selectSection('test1')}>test1</div>
                        <div className={selectedSection === 'test2' ? classNames(s.sectionSpan, s.selectedSectionSpan) : s.sectionSpan} onClick={() => selectSection('test2')}>test2</div>
                      </div>
                      <div className={s.sectionLink}>
                        <div className={s.sectionHeader}>UI settings</div>
                        <div className={selectedSection === 'test3' ? classNames(s.sectionSpan, s.selectedSectionSpan) : s.sectionSpan} onClick={() => selectSection('test3')}>test3</div>
                        <div className={selectedSection === 'test4' ? classNames(s.sectionSpan, s.selectedSectionSpan) : s.sectionSpan} onClick={() => selectSection('test4')}>test4</div>
                      </div>
                      <div className={s.sectionLink}>
                        <div className={s.sectionHeader}>User settings</div>
                        <div className={selectedSection === 'test5' ? classNames(s.sectionSpan, s.selectedSectionSpan) : s.sectionSpan} onClick={() => selectSection('test5')}>test5</div>
                        <div className={selectedSection === 'test6' ? classNames(s.sectionSpan, s.selectedSectionSpan) : s.sectionSpan} onClick={() => selectSection('test6')}>test6</div>
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
                      </p>: selectedSection === 'test2' ?
                        <p>
                          <b>Sorry, not ready yet! 2</b>
                        </p> :
                        <p>fail</p>
                    }
                  </div>
                </div>
                <div className={s.exitModal}>
                  <div className={classNames(s.exitModalIcon)} />
                </div>
              </div>
            </div>
        }
        </Transition>
      </div>
    );
  }
}
