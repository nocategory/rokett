// @flow
import React, { Component } from 'react';
import Style from 'react-style-tag';
import fs from 'fs';
import MonacoEditor from './monaco';
import settings from '../../settings.json';
import s from './Editor.css';

class Editor extends Component {

  editorDidMount: Function;
  editor: Object;

  props: {
    setEditorMount: () => void
  };

  constructor() {
    super();
    this.editorDidMount = this.editorDidMount.bind(this);
    this.tabModelHandler = this.tabModelHandler.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  // WORK ON REMOVE TABS, WOT HAPPENS...

  componentWillReceiveProps(nextProps: Object) {
    if (this.props.tabs !== nextProps.tabs) {
      if (nextProps.tabs.length < this.props.tabs) {
        // Tab removed
      } else {
        // Tab added
        if (!this.monaco) {
          // Since monaco isn't mounted yet, wait some seconds.
          // Kinda hacky but it works
          setTimeout(() => this.tabModelHandler(), 4000);
        } else {
          this.tabModelHandler();
        }
      }
    }
    if (this.props.activeTabFilePath !== nextProps.activeTabFilePath && this.monaco) {
      const uri = this.monaco.Uri.file(nextProps.activeTabFilePath);
      const model = this.monaco.editor.getModel(uri);
      this.editor.setModel(model);
    }
    if (this.props.saveFile !== nextProps.saveFile) {
      const uri = this.monaco.Uri.file(nextProps.activeTabFilePath);
      const model = this.monaco.editor.getModel(uri);
      fs.writeFile(nextProps.activeTabFilePath, model.getValue(), (err) => {
        if (err) {
          console.log('Error saving file: ' + err.message);
          return;
        }
        console.log('SAVED');
      });
    }
  }

  tabModelHandler() {
    const uri = this.monaco.Uri.file(this.props.currentFilePath);
    if (this.monaco.editor.getModel(uri)) {
      return this.editor.setModel(this.monaco.editor.getModel(uri));
    }
    const model = this.monaco.editor.createModel([
      this.props.currentContent
    ].join('\n'),
    undefined, uri);
    this.editor.setModel(model);
  }

  editorDidMount(editor: Object, monaco: Object) {
    const { setEditorMount, currentContent, currentFilePath } = this.props;
    if (!this.props.languages) {
      const languagesArray = monaco.languages.getLanguages();
      setEditorMount(languagesArray);
    } else {
      setEditorMount(this.props.languages);
    }
    editor.focus();
    this.monaco = monaco;
    console.log(monaco.editor.setValue);
    console.log('this.monaco now exists');
    this.editor = editor;
    const uri = this.monaco.Uri.file(this.props.currentFilePath);
    const model = this.editor.getModel(uri);
    this.editor.setModel(model);
  }

  onChange() {
    const uri = this.monaco.Uri.file(this.props.currentFilePath);
    const model = this.editor.getModel(uri);
    console.log(model);
  }

  render() {
    // $FlowIssue
    const { currentContent } = this.props;
    return (
      <div className={s.editorWrapper}>
        <div className="h100">
          <MonacoEditor
            width={'100%'}
            height={'100%'}
            theme="vs-dark"
            editorDidMount={this.editorDidMount}
            onChange={this.onChange}
          />
        </div>
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

export default Editor;
