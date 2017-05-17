// @flow
import React, { Component } from 'react';
import { spring } from 'react-motion';
import Transition from 'react-motion-ui-pack';
import s from './AppLayer.css';

export default class AppLayer extends Component {
  render() {
    const { settingsVisible, fileTreeVisible } = this.props;
    // @TODO: actual settings with section names n stuff
    return (
      <div className={s.layer}>
        <div className="flex-vertical h100">
          {this.props.children}
        </div>
      </div>
    );
  }
}
