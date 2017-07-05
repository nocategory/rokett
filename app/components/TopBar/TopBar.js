// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import Tab from '../Tab/Tab';
import s from './TopBar.css';
import settings from '../../settings.json';


const topBarStyle = {
  backgroundColor: settings.frame.mainColor,
};

class TopBar extends Component {
  render() {
    return (
      <div className={s.topBarWrapper} style={topBarStyle}>
        <Tab {...this.props} />
      </div>
    );
  }
}

export default translate(['common'], { wait: true })(TopBar);
