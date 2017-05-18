// @flow
import React, { Component } from 'react';

export default class AppLayer extends Component {
  render() {
    // @TODO: actual settings with section names n stuff
    return (
      <div className="flex-vertical h100">
        {this.props.children}
      </div>
    );
  }
}
