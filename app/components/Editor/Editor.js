// @flow
import React, { Component } from 'react';
import Style from 'react-style-tag';
// $FlowIssue => index is a modified version of react-monaco-editor
import MonacoEditor from './index';
import settings from '../../settings.json';
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

  editorDidMount(editor: Object) {
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
        <Style>{`
          .monaco-editor, .monaco-editor-background {
            background: ${settings.frame.mainColor} !important;
          }

          /* Current line */
          .monaco-editor .current-line {
            background: rgba(255, 255, 255, 0.1) !important;
          }

          /* Line Numbers */
          .monaco-editor .line-numbers {
            color: rgb(235, 235, 235) !important;
          }

          /* Selection */
          .monaco-editor .view-overlays.focused .selected-text {
            background: rgba(225, 225, 225, 0.15) !important;
          }
          .monaco-editor .view-overlays .selected-text {
            background: rgba(225, 225, 225, 0.15) !important;
          }

          /* Scroll border */
          .monaco-editor .decorationsOverviewRuler {
            visibility: hidden;
          }
        `}</Style>
      </div>
    );
  }
}
