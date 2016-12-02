// @flow
import React, { Component } from 'react';
import s from './DraggableArea.css';

// electron doesn't like import with remote, so require is used
const remote = require('electron').remote;

// get window
const appWindow = remote.getCurrentWindow();

export default class DraggableArea extends Component {
  /**
   * window frame click actions
   */
  minClick() {
    appWindow.minimize();
  }

  maxClick() {
    if (!appWindow.isMaximized()) {
      appWindow.maximize();
    }
    else {
      appWindow.unmaximize();
    }
  }

  closeClick() {
    appWindow.close();
  }

  render() {
    return (
      <div className={`${s['app--draggable--area']}`}>
        {/* command box */}
        <div className={`${s['app--command--box--wrapper']}`}>
          <i className={`${s.settingsButton} fa fa-bars non--draggable`} aria-hidden="true" />
          <input className={`${s['app--command--box']} non--draggable`} />
        </div>
        {/* frame buttons */}
        <div className={`${s['app--frame--buttons']} non--draggable`}>
          <div className={`${s['app--frame--minimize']}`} onClick={this.minClick} />
          <div className={`${s['app--frame--maximize']}`} onClick={this.maxClick} />
          <div className={`${s['app--frame--close']}`} onClick={this.closeClick} />
        </div>
      </div>
    );
  }
}
