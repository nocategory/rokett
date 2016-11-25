// @flow
import React, { Component } from 'react';
// import styles from './Home.css';

const windowButtonStyle = {
  color: '#FFF',
  marginLeft: '12.5px',
  marginRight: '12.5px',
};

const closeButtonStyle = {
  fontSize: '1.35em',
};

export default class DraggableArea extends Component {
  render() {
    return (
      <div className="app--draggable--area">
        <span className="fa fa-window-minimize" onClick={this.minClick} style={windowButtonStyle} />
        <span className="fa fa-window-maximize" onClick={this.maxClick} style={windowButtonStyle} />
        <span className="fa fa-2x fa-times" onClick={this.closeClick} style={[windowButtonStyle, closeButtonStyle]} />
      </div>
    );
  }
}
