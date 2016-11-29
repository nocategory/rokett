// @flow
import React, { Component } from 'react';
import s from './Sidebar.css';

export default class Sidebar extends Component {
  render() {
    return (
      /* sidebar for files */
      <div className={`${s['app--sidebar']} non--draggable`} />
    );
  }
}
