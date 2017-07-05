// @flow
import React, { Component } from 'react';
import s from './Tab.css';

export default class Tab extends Component {
  render() {
    // @TODO: actual settings with section names n stuff
    return (
      <div className={s.tab}>
        <span className={s.tabName}>test</span>
      </div>
    );
  }
}
