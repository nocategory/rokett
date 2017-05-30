// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import classNames from 'classnames';
import s from './Settings.css';
import settings from '../../settings.json';

class Settings extends Component {
  render() {
    const { selectSection, selectedSection, t } = this.props;
    return (
      <div>
        <div className={s.sidebarWrapper} style={{ background: settings.frame.secondaryColor }}>
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
            {(() => {
              if (selectedSection === 'test1') {
                return (
                  <p>
                    <b>Sorry, not ready yet! 1</b>
                  </p>
                );
              } else if (selectedSection === 'test2') {
                return (
                  <p>
                    <b>Sorry, not ready yet! 2</b>
                  </p>
                );
              }
            })()}
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
