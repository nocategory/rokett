// @flow
import React, { Component } from 'react';
import keydown from 'react-keydown';
import fs from 'fs';
import MonacoEditor from './index';
import s from './Editor.css';

export default class Editor extends Component {
  props: {
    editorMount: () => void
  };

  editorDidMount(editor, monaco) {
    console.log('editorDidMount', editor);
    editorMount();
    editor.focus();
  }

  onChange(newValue, e) {
    console.log('onChange', newValue, e);
  }

  render() {
    const { editorMount } = this.props;
    return (
      <MonacoEditor
        width="100%"
        height="100%"
        language="javascript"
        onChange={::this.onChange}
        editorDidMount={::this.editorDidMount}
        value={"ee"}
      />
    );
  }
}
