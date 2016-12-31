// @flow
import React, { Component } from 'react';
import { Treebeard } from 'react-treebeard';
import fs from 'fs';
import dirTree from '../../directory-tree';
import s from './Tree.css';

let content;

export default class Tree extends Component {
  constructor() {
    super();
    this.state = {};
    this.onToggle = this.onToggle.bind(this);
  }

  componentWillMount() {
    this.tree = dirTree('L:\\Users\\joaoz\\Desktop\\quarkz\\app\\components');
  }

  // file tree
  onToggle(node, toggled) {
    if (this.state.cursor) { this.state.cursor.active = false; }
    node.active = true;
    if (node.children) { node.toggled = toggled; }
    if (node.extension) { // file
      content = this.getFileContent(node.path);
      console.log('content AFTER FUNCTION: ' + content);
    }
    else {
      content = '';
    }
    this.setState({ cursor: node });
  }

  getFileContent(path) {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        console.log('m');
        return console.log(err);
      }
      console.log('DATA: ' + data);
      this.setState({
        value: data
      });
      return data;
    });
  }

  render() {
    const treeStyle = {
      zIndex: 99,
      WebkitAppRegion: 'no-drag',
    };

    return (
      <div className="app--tree">
        <div style={treeStyle}>
          <Treebeard
            data={this.tree}
            onToggle={this.onToggle}
          />
        </div>
        <div className="tree-chevron-wrapper">
          <i className="fa fa-chevron-right" />
        </div>
      </div>
    );
  }
}
