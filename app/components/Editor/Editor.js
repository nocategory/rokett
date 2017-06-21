// @flow
import React, { Component } from 'react';
import Style from 'react-style-tag';
import Measure from 'react-measure';
import MonacoEditor from './monaco';
import settings from '../../settings.json';
import s from './Editor.css';

export default class Editor extends Component {

  editorDidMount: Function;
  editor: Object;

  props: {
    setEditorMount: () => void,
    editorLang: string
  };

  constructor() {
    super();
    this.editorDidMount = this.editorDidMount.bind(this);
  }

  editorDidMount(editor: Object, monaco: Object) {
    const { setEditorMount } = this.props;
    const languagesArray = monaco.languages.getLanguages();
    setEditorMount(languagesArray);
    editor.focus();
    this.editor = editor;
  }

  onChange(newValue: string, e: Object) {
    console.log('onChange', newValue, e);
  }

  render() {
    // $FlowIssue
    const { currentContent } = this.props;
    return (
      <div className={s.editorWrapper}>
        <Measure
          onResize={() => {
            if (this.editor) {
              this.editor.layout();
            }
          }}
        >
          { ({ measureRef }) => (
            <div className="h100" ref={measureRef}>
              <MonacoEditor
                width={'100%'}
                height={'100%'}
                theme="vs-dark"
                language={this.props.editorLang}
                value={currentContent}
                onChange={this.onChange}
                editorDidMount={this.editorDidMount}
              />
            </div>
            )
          }
        </Measure>
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
