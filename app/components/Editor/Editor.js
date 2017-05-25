// @flow
import React, { Component } from 'react';
import MonacoEditor from './index';
import s from './Editor.css';

export default class Editor extends Component {
  props: {
    setEditorMount: () => void
  };

  constructor() {
    super();
    // $FlowFixMe
    this.editorDidMount = this.editorDidMount.bind(this);
  }

  editorDidMount(editor) {
    const { setEditorMount } = this.props;
    setEditorMount();
    editor.focus();
  }

  // $FlowFixMe
  onChange(newValue: string, e) {
    console.log('onChange', newValue, e);
  }

  render() {
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
