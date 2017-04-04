// @flow
import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';
import keydown from 'react-keydown';
import fs from 'fs';
import s from './Editor.css';

export default class Tree extends Component {
  constructor() {
    super();
    this.saveFile = this.saveFile.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.props.editorOnChange(this.editor.getValue());
  }

  @keydown('ctrl+s')
  saveFile() {
    console.log(this.props.currentContent);
    if (!this.props.currentContent || (this.props.currentContent === this.props.initialContent && this.props.saved === true)) return null;
    fs.writeFile(this.props.currentFilePath, this.props.currentContent, (err) => {
      if (err) {
        console.log('error saving file: ' + err.message);
        console.log(err);
        return;
      }
      // set the saved to true
      // and
      // initialContent = currentContent
      this.props.setEditorContent(this.props.currentContent, this.props.currentFilePath);
      console.log('SAVED');
    });
  }

  render() {
    const requireConfig = {
      url: 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.1/require.min.js',
      paths: {
        'vs': 'node_modules/monaco-editor/min/vs',
      }
    };
    return (
      <div className="editor-wrapper">
        <MonacoEditor
          width="800"
          height="600"
          language="javascript"
          value={this.props.currentContent}
          requireConfig={requireConfig}
        />
      </div>
    );
  }
}
