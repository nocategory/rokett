// @flow
import React, { Component } from 'react';
import path from 'path';
import Tab from '../components/Tab/Tab';

export default class App extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.currentFilePath !== nextProps.currentFilePath) {
      // new tab
      this.props.newTab(nextProps.currentFilePath);
    }
  }
  render() {
    return (
      <div style={{ display: 'inline-flex', width: 'calc(100% - 125px)' }}>
        {this.props.tabs.map((fp, i) => {
          const fileName = path.basename(fp.path);
          return (
            <Tab fileName={fileName} key={i} tabC={() => this.props.tabClick(fp.path)} tabCl={() => this.props.tabClose(fp.path)} {...this.props} />
          );
        })}
      </div>
    );
  }
}
