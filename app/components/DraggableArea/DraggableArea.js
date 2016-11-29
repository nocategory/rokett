// @flow
import React, { Component } from 'react';
import s from './DraggableArea.css';

// electron doesn't like import when importing remote
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
      <div className="app--draggable--area">
        <div className="non--draggable--area">
          <div className={`${s['app--frame--minimize']}`} onClick={this.minClick} />
          <div className={`${s['app--frame--maximize']}`} onClick={this.maxClick} />
          <div className={`${s['app--frame--close']}`} onClick={this.closeClick} />
        </div>
      </div>
    );
  }
}
