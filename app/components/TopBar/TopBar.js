// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import Tabs from '../../containers/Tabs';
import s from './TopBar.css';
import settings from '../../settings.json';


const topBarStyle = {
  backgroundColor: settings.frame.mainColor,
};

class TopBar extends Component {
  render() {
    return (
      <div className={s.topBarWrapper} style={topBarStyle}>
        <Tabs {...this.props} />
      </div>
    );
  }
}

export default translate(['common'], { wait: true })(TopBar);
