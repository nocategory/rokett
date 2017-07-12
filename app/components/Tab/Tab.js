// @flow
import React, { Component } from 'react';
import s from './Tab.css';

export default class Tab extends Component {
  render() {
    const { fileName, tabC, tabCl } = this.props;
    // onclick setNewModel
    // on editor, componentWillReceiveProps model with filepath sent throug hhere
    return (
      <div className={s.tab}>
        <span className={s.tabName} onClick={tabC}>{fileName}</span>
        <i onClick={tabCl} style={{ position: 'absolute', right: '25px', zIndex: '88' }}>X</i>
      </div>
    );
  }
}
