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
    return (
      <div className={`${s['app--command--box--wrapper']}`}>
        <button className={s.signInButton}>Sign In</button>
        <i className={`${s.menuButton} fa fa-bars`} aria-hidden="true" onClick={this.chooseDirectory} />
        <input className={`${s['app--command--box']}`} />
      </div>
    );
  }
}
