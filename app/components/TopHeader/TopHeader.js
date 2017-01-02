// @flow
import React, { Component } from 'react';
import s from './TopHeader.css';

const { remote } = require('electron');

const { dialog } = remote;

export default class TopHeader extends Component {
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
    let saveStatus;
    if (!this.props.currentFilePath) {
      saveStatus = null;
    }
    else {
      if (this.props.saved) {
        saveStatus = (
          <span className={s.saveStatusOK}>SAVED</span>
        );
      }
      else {
        saveStatus = (
          <span className={s.saveStatusNO}>NOT SAVED</span>
        );
      }
    }
    return (
      <div className={`${s['app--command--box--wrapper']}`}>
        {saveStatus}
        <i className={`${s.menuButton} fa fa-bars`} aria-hidden="true" onClick={this.chooseDirectory} />
        <input className={`${s['app--command--box']}`} />
      </div>
    );
  }
}
