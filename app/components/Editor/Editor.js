// @flow
import React, { Component } from 'react';
import * as ace from 'brace';
import 'brace/theme/tomorrow_night_bright';
import 'brace/ext/language_tools';
import 'brace/ext/emmet';
import AceEditor from 'react-ace';
import keydown from 'react-keydown';
import fs from 'fs';
import s from './Editor.css';

/**
 * ACE editor modes file names differs from brace's
 */
ace.config.set('modePath', 'ace_modes');
const languageTools = ace.acequire('ace/ext/language_tools');
const emmet = ace.acequire('ace/ext/emmet');

export default class Tree extends Component {
  constructor() {
    super();
    this.saveFile = this.saveFile.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.editor = ace.edit('editor');
  }

  onChange() {
    this.props.editorOnChange(this.editor.getValue());
  }

  requireMode(r) {
    require(`brace/mode/${r}`);
    return r;
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
    return (
      <div className="editor-wrapper">
        <AceEditor
          {...this.props}
          mode={this.props.editorMode ? this.requireMode(this.props.editorMode) : 'text'}
          theme="tomorrow_night_bright"
          onChange={this.onChange}
          name="editor"
          fontSize={17}
          width={'100%'}
          value={this.props.currentContent}
          height={'calc(100vh - 52px - 24px)'}
          enableLiveAutocompletion
          enableBasicAutocompletion
          wrapEnabled
          focus
          editorProps={{ $blockScrolling: Infinity }}
          setOptions={{
            animatedScroll: true,
            scrollPastEnd: true,
          }}
        />
      </div>
    );
  }
}
