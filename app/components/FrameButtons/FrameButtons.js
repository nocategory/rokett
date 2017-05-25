// @flow
import React, { Component } from 'react';
import s from './FrameButtons.css';

// electron doesn't like import with remote, so require is used
const { remote } = require('electron');

// get window
const appWindow = remote.getCurrentWindow();

export default class FrameButtons extends Component {
  /**
   * window frame click actions
   */
  minClick() {
    appWindow.minimize();
  }

  maxClick() {
    if (!appWindow.isMaximized()) {
      appWindow.maximize();
    } else {
      appWindow.unmaximize();
    }
  }

  closeClick() {
    appWindow.close();
  }

  render() {
    return (
      <div className={s.titlebar}>
        <div className={s.frameButtons}>
          <div className={s.frameMinimize} onClick={this.minClick} />
          <div className={s.frameMaximize} onClick={this.maxClick} />
          <div className={s.frameClose} onClick={this.closeClick} />
        </div>
      </div>
    );
  }
}
