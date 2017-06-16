// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import chokidar from 'chokidar';
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

  chooseDirectory() {
    dialog.showOpenDialog({
      title: 'Select a folder',
      properties: ['openDirectory'],
    }, (folderPath) => {
      if (folderPath) {
        this.props.setActiveFolder(folderPath[0]);
        chokidar.watch(folderPath[0], { ignoreInitial: true }).on('all', (event, path) => {
          console.log(event, path);
          this.props.setActiveFolder(this.props.currentFolderPath);
        });
      }
    });
  }

  render() {
    const { t, toggleSettings } = this.props;
    return (
      <div className={s.sidebarWrapper}>
        <div className={s.sidebarTop}>
          {/* @TODO new file */}
          <IconButton iconName="file" iconFunction={this.chooseDirectory} tip={t('common:topbar:newFile')} theme="light" />
          <IconButton iconName="folder" iconFunction={this.chooseDirectory} tip={t('common:topbar:openFolder')} theme="light" />
        </div>
        <div className={s.sidebarBottom}>
          <IconButton iconName="cog" iconFunction={toggleSettings} tip={t('common:topbar:settings')} theme="light" />
        </div>
      </div>
    );
  }
}

export default translate(['common'], { wait: true })(Sidebar);
