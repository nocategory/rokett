// @flow
import React, { Component } from 'react';
import { Treebeard } from 'react-treebeard';
import fs from 'fs';
import s from './Tree.css';

export default class Tree extends Component {
  constructor() {
    super();
    // $FlowIssue
    this.state = {};
    // $FlowIssue
    this.onToggle = this.onToggle.bind(this);
    // $FlowIssue
    this.editorContentCallback = this.editorContentCallback.bind(this);
  }

  // file tree
  // $FlowIssue
  onToggle(node, toggled) {
    const currentNode = node;
    // $FlowIssue
    if (this.state.cursor) {
      this.state.cursor.active = false;
    }
    currentNode.active = true;
    if (node.children) {
      currentNode.toggled = toggled;
    }
    if (node.extension || node.extension === '') { // file
      this.getFileContent(node.path);
    }
    // $FlowIssue
    this.setState({ cursor: node });
    // $FlowIssue
    console.log(this.state.cursor);
  }

  getFileContent(path: string) {
    fs.readFile(path, 'utf8', (err, data) => {
      this.editorContentCallback(data, path);
    });
  }

  editorContentCallback(initContent: string, filePath: string) {
    /** call redux action to set
     * editor content
     */
    const { setEditorContent } = this.props;
    setEditorContent(initContent, filePath);
  }

  render() {
    const treeStyle = {
      zIndex: 99,
      WebkitAppRegion: 'no-drag',
    };

    return (
      <div className={s.treeWrapper}>
        <div style={treeStyle}>
          <Treebeard
            data={this.props.currentFolderJSON ? this.props.currentFolderJSON : ''}
            onToggle={this.onToggle}
            animations={false}
          />
        </div>
      </div>
    );
  }
}
