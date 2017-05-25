// @flow
import React, { Component } from 'react';
import { translate, Interpolate } from 'react-i18next';
import classNames from 'classnames';
import s from './Settings.css';

class Settings extends Component {
  render() {
    const { toggleModal, selectSection, selectedSection, t } = this.props;
    return (
      <div>
        <div className={s.sidebarWrapper}>
          <div className={s.sidebar}>
            <div className={s.sectionWrapper}>
              <div className={s.sectionLink}>
                <div className={selectedSection === 'test1' ? classNames(s.sectionHeader, s.selectedSectionHeader) : s.sectionHeader} onClick={() => selectSection('test1')}>{t('settings:firstSection')}</div>
              </div>
              <div className={s.sectionLink}>
                <div className={selectedSection === 'test2' ? classNames(s.sectionHeader, s.selectedSectionHeader) : s.sectionHeader} onClick={() => selectSection('test2')}>{t('settings:secondSection')}</div>
              </div>
              <div className={s.sectionLink}>
                <div className={selectedSection === 'test3' ? classNames(s.sectionHeader, s.selectedSectionHeader) : s.sectionHeader} onClick={() => selectSection('test3')}>{t('settings:thirdSection')}</div>
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
    );
  }
}

export default translate(['settings'], { wait: true })(Settings);
