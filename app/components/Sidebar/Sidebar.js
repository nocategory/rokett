// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import IconButton from '../IconButton/IconButton';
import s from './Sidebar.css';

const { remote } = require('electron');

const { dialog } = remote;

class Sidebar extends Component {
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

  /**
   * Open directory
   */

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
    const { t, toggleSettings, toggleFileTree } = this.props;
    return (
      <div className={s.sidebarWrapper}>
        <div className={s.sidebarTop}>
          {/* @TODO new file */}
          <IconButton iconName="file" iconFunction={this.chooseDirectory} tip={t('common:topbar:newFile')} theme="light" />
          <IconButton iconName="folder" iconFunction={this.chooseDirectory} tip={t('common:topbar:openFolder')} theme="light" />
          <IconButton iconName="map" iconFunction={toggleFileTree} tip={t('common:topbar:filetree')} theme="light" />
        </div>
        <div className={s.sidebarBottom}>
          <IconButton iconName="cog" iconFunction={toggleSettings} tip={t('common:topbar:settings')} theme="light" />
        </div>
      </div>
    );
  }
}

export default translate(['common'], { wait: true })(Sidebar);
