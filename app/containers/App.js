// @flow
import React, { Component, PropTypes } from 'react';
const remote = require('electron').remote;

const windowButtonStyle = {
  color: '#FFF',
  marginLeft: '12.5px',
  marginRight: '12.5px',
};

const closeButtonStyle = {
	fontSize: '1.35em',
};

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  minClick() {
    console.log('ee');
  }

  maxClick() {

  }

  closeClick() {

  }

  render() {
    return (
      <div>
        <div className="app--draggable--area">
          <span className="fa fa-window-minimize" onDoubleClick={this.minClick} style={windowButtonStyle}></span>
          <span className="fa fa-window-maximize" onClick={this.maxClick} style={windowButtonStyle}></span>
          <span className="fa fa-2x fa-times" onClick={this.closeClick} style={[windowButtonStyle, closeButtonStyle]}></span>
        </div>
        <div className="app--content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
