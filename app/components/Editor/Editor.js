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
import MonacoEditor from './index';
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

  editorDidMount(editor, monaco) {
    const { setEditorMount } = this.props;
    console.log("KAPPA123")
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
        <MonacoEditor
          width={'100%'}
          height={'100%'}
          language="javascript"
          theme="vs-dark"
          value={this.props.currentContent}
          editorDidMount={::this.editorDidMount}
        />
      </div>
    );
  }
}
