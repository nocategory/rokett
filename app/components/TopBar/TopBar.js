// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import s from './TopBar.css';
import IconButton from '../IconButton/IconButton';
import settings from '../../settings.json';

const { remote } = require('electron');

const { dialog } = remote;


const topBarStyle = {
  backgroundColor: settings.frame.thirdColor,
};

class TopBar extends Component {

  chooseDirectory: Function;

  props: {
    toggleSettings: () => void,
    setActiveFolder: () => void,
    t: Function
  }

  constructor() {
    super();
    this.chooseDirectory = this.chooseDirectory.bind(this);
  }

  chooseDirectory() {
    dialog.showOpenDialog({
      title: 'Select a folder',
      properties: ['openDirectory'],
    }, (folderPath) => {
      if (folderPath) {
        this.props.setActiveFolder(folderPath[0]);
      }
    });
  }

  render() {
    const { t, toggleSettings } = this.props;
    return (
      <div className={s.topBarWrapper} style={topBarStyle}>
        <div className={s.leftTopBar}>
          {/* @TODO new file */}
          <IconButton iconName="file" iconFunction={this.chooseDirectory} tip={t('common:topbar:newFile')} theme="light" />
          <IconButton iconName="folder" iconFunction={this.chooseDirectory} tip={t('common:topbar:openFolder')} theme="light" />
          <IconButton iconName="cog" iconFunction={toggleSettings} tip={t('common:topbar:settings')} theme="light" />
        </div>
      </div>
    );
  }
}

export default translate(['common'], { wait: true })(TopBar);
