// @flow
import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import s from './IconButton.css';

export default class IconButton extends Component {
  props: {
    iconName: string,
    iconFunction: Function,
    tip: string,
    theme: string
  };

  render() {
    return (
      <div className={s.icon} data-for={this.props.iconName} data-tip={this.props.tip} style={{ backgroundImage: `url('./assets/${this.props.iconName}.svg')` }} onClick={this.props.iconFunction}>
        <ReactTooltip id={this.props.iconName} place="bottom" effect="solid" border={false} type={this.props.theme} />
      </div>
    );
  }
}
