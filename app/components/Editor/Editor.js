// @flow
import React, { Component } from 'react';
// $FlowIssue => index is a modified version of react-monaco-editor
import MonacoEditor from './index';
import s from './Editor.css';

export default class Editor extends Component {

  editorDidMount: Function;

  props: {
    setEditorMount: () => void
  };

  constructor() {
    super();
    this.editorDidMount = this.editorDidMount.bind(this);
  }

  editorDidMount(editor: HTMLElement) {
    const { setEditorMount } = this.props;
    setEditorMount();
    editor.focus();
  }

  onChange(newValue: string, e: Event) {
    console.log('onChange', newValue, e);
  }

  render() {
    // $FlowIssue
    const { currentContent } = this.props;
    return (
      <div className={s.editorWrapper}>
        <MonacoEditor
          width={'100%'}
          height={'100%'}
          language="javascript"
          theme="vs-dark"
          value={currentContent}
          editorDidMount={this.editorDidMount}
        />
      </div>
    );
  }
}
