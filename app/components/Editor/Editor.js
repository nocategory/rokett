// @flow
import React, { Component } from 'react';
import keydown from 'react-keydown';
import MonacoEditor from './index';
import fs from 'fs';
import s from './Editor.css';

export default class Tree extends Component {

  render() {
    return (
      <MonacoEditor
       width="100%"
       height="100%"
       language="javascript"
       value={"ee"}
     />
    );
  }
}
