// @flow
import React, { Component, PropTypes } from 'react';
import DraggableArea from '../components/DraggableArea/DraggableArea';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div>
        <DraggableArea />
        <div className="app--content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
