// @flow
import React, { Component } from 'react';
import s from './Icon.css';

export default class Loading extends Component {
  props: {
    iconName: string,
    iconFunction: Function
  };

  render() {
    return (
      <div className={s.icon} style={{ backgroundImage: `url('./assets/${this.props.iconName}.svg')` }} onClick={this.props.iconFunction} />
    );
  }
}
