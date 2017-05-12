// @flow
import React, { Component } from 'react';
import s from './TopHeader.css';
import settings from '../../settings.json';

const { remote } = require('electron');

const { dialog } = remote;


const topHeaderStyle = {
  backgroundColor: settings.frame.mainColor,
};

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
      <div className={`${s['app--command--box--wrapper']}`} style={topHeaderStyle}>
        <i className={`${s.menuButton} fa fa-bars`} aria-hidden="true" onClick={this.chooseDirectory} />
      </div>
    );
  }
}
