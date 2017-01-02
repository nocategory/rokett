// @flow
import React, { Component } from 'react';
import { Treebeard } from 'react-treebeard';
import fs from 'fs';
import dirTree from '../../directory-tree';
import s from './Tree.css';

export default class Tree extends Component {

  constructor() {
    super();
    this.state = {};
    this.onToggle = this.onToggle.bind(this);
    this.editorContentCallback = this.editorContentCallback.bind(this);
  }

  componentWillMount() {
    this.tree = dirTree('L:\\Users\\joaoz\\Desktop\\quarkz\\app\\components');
  }

  // file tree
  onToggle(node, toggled) {
    if (this.state.cursor) {
      this.state.cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    if (node.extension) { // file
      this.getFileContent(node.path);
    }
    this.setState({ cursor: node });
  }

  getFileContent(path) {
    fs.readFile(path, 'utf8', (err, data) => {
      this.editorContentCallback(data, path);
    });
  }

  editorContentCallback(d, p) {
    /** call redux action to set
     * editor content
     */
    const { setEditorContent } = this.props;
    setEditorContent(d, p);
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
