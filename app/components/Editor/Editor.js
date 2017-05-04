// @flow
import React, { Component } from 'react';
import keydown from 'react-keydown';
import fs from 'fs';
import {
  ChasingDots,
  Circle,
  CubeGrid,
  DoubleBounce,
  FadingCircle,
  FoldingCube,
  Pulse,
  RotatingPlane,
  ThreeBounce,
  WanderingCubes,
  Wave,
} from 'better-react-spinkit';
// const MonacoEditor = require('./index');
import Loading from '../Loading/Loading';
import s from './Editor.css';

const test = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#212121',
  opacity: '.4',
};

export default class Editor extends Component {
  props: {
    setEditorMount: () => void
  };

  componentDidMount() {
    let amdRequire = global.require('monaco-editor/min/vs/loader.js').require;
    var path = require('path');
    var fs = require('fs');
    function uriFromPath(_path) {
      var pathName = path.resolve(_path).replace(/\\/g, '/');
      if (pathName.length > 0 && pathName.charAt(0) !== '/') {
        pathName = '/' + pathName;
      }
      return encodeURI('file://' + pathName);
    }
    //
    amdRequire.config({
      baseUrl: uriFromPath(path.resolve(__dirname, '../node_modules/monaco-editor/min'))
    });
    // workaround monaco-css not understanding the environment
    self.module = undefined;
    // workaround monaco-typescript not understanding the environment
    self.process.browser = true;
    const id = this.props.id;
    var editor;
    amdRequire(['vs/editor/editor.main'], () => {
      editor = monaco.editor.create(document.getElementById(id), {
        value: 'ee',
        language: 'javascript',
        theme: "vs-dark",
      });
      this.props.addEditorInstance(editor, id);

      window.addEventListener('resize', () => {
        if (id === this.props.activeTab) {
          let editorNode = document.getElementById(id);
          let parent = editorNode.parentElement;
          editorNode.style.width = parent.clientWidth;
          editorNode.firstElementChild.style.width = parent.clientWidth;
          editorNode.firstElementChild.firstElementChild.style.width = parent.clientWidth;
          editorNode.getElementsByClassName('monaco-scrollable-element')[0].style.width = parent.clientWidth - 46;
        }
      })
    });
  }

  editorDidMount(editor, monaco) {
    const { setEditorMount } = this.props;
    setEditorMount();
    editor.focus();
  }

  onChange(newValue, e) {
    console.log('onChange', newValue, e);
  }

  render() {
    const { editorIsMounted } = this.props;
    return (
      <div className={s.editorWrapper}>
        {/* {!editorIsMounted &&
          <Loading />
        }*/}
        <div className="editor-container" style={{ height: '100%', width: '100%' }}></div>
      </div>
    );
  }
}
