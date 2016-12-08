// @flow
import React, { Component } from 'react';
import s from './TopHeader.css';

export default class TopHeader extends Component {
  render() {
    return (
      <div className={`${s['app--command--box--wrapper']}`}>
        <i className={`${s.menuButton} fa fa-bars`} aria-hidden="true" />
        <input className={`${s['app--command--box']}`} />
      </div>
    );
  }
}
