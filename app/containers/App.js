// @flow
import React, { Component, PropTypes } from 'react';
import DraggableArea from '../components/DraggableArea/DraggableArea';
import Sidebar from '../components/Sidebar/Sidebar';


export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div className="app--wrapper">
        <Sidebar />
        <div className="app--content--wrapper">
          <DraggableArea />
          <div className="app--content" id="app--content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
