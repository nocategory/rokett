// @flow
import React, { Component } from 'react';
import { Treebeard } from 'react-treebeard';
import fs from 'fs';
import s from './Tree.css';

export default class Tree extends Component {
  constructor() {
    super();
    this.state = {};
    this.onToggle = this.onToggle.bind(this);
    this.editorContentCallback = this.editorContentCallback.bind(this);
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
    if (node.extension || node.extension === '') { // file
      this.getFileContent(node.path);
    }
    this.setState({ cursor: node });
    console.log(this.state.cursor);
  }

  getFileContent(path) {
    fs.readFile(path, 'utf8', (err, data) => {
      console.log('Wohoo!');
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
      <div className={s.treeWrapper}>
        <div style={treeStyle}>
          <Treebeard
            data={this.props.currentFolderJSON ? this.props.currentFolderJSON : {}}
            onToggle={this.onToggle}
            animations={false}
          />
        </div>
      </div>
    );
  }
}
