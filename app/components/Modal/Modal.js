// @flow
import React, { Component } from 'react';
import treeFunctions from '../Tree/treeFunctions';
import s from './Modal.css';

export default class Modal extends Component {
  state: Object;
  inputChange: Function;

  constructor() {
    super();
    this.state = { input: '' };
  }

  inputChange(e) {
    this.setState({ input: e.target.value });
  }
  render() {
    const { treeModalData, treeModalType, toggleTreeModal } = this.props;
    console.log(treeModalData);
    let modalContent;
    switch (treeModalType) {
      case 'NEW_FILE':
        modalContent = (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <p className={s.actionDesc}>New file name</p>
            <form onSubmit={() => { treeFunctions.newFile(treeModalData, this.state.input); toggleTreeModal(null, null, null); }}>
              <input type="text" ref={input => input && input.focus()} value={this.state.input} className={s.inputBox} onChange={this.inputChange.bind(this)} tabIndex="-1" />
            </form>
          </div>
        );
        break;
      case 'NEW_FOLDER':
        modalContent = (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <p className={s.actionDesc}>New folder name</p>
            <form onSubmit={() => { treeFunctions.newFolder(treeModalData, this.state.input); toggleTreeModal(null, null, null); }}>
              <input type="text" ref={input => input && input.focus()} value={this.state.input} className={s.inputBox} onChange={this.inputChange.bind(this)} />
            </form>
          </div>
        );
        break;
      case 'RENAME':
        modalContent = (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p className={s.actionDesc} style={{ color: 'rgb(193, 73, 73)', paddingRight: '25px', fontWeight: '700' }}>{treeModalData.name}</p>
            <div>&rArr;</div>
            <form onSubmit={() => { treeFunctions.rename(treeModalData, this.state.input); toggleTreeModal(null, null, null); }}>
              <input type="text" ref={input => input && input.focus()} value={this.state.input} className={s.inputBox} onChange={this.inputChange.bind(this)} style={{ marginLeft: '25px', color: 'hsl(111, 49%, 52%)' }} />
            </form>
          </div>
        );
        break;
      case 'DELETE':
        modalContent = (
          <div>
            <p className={s.actionDesc} style={{ color: 'rgb(193, 73, 73)', paddingRight: '25px', fontWeight: '700' }}>Are you sure you want to delete {treeModalData.name}?</p>
          </div>
        );
        break;
    }
    return (
      <div>
        <div className={s.modal}>
          {modalContent}
        </div>
        <div className={s.modalBack} onClick={() => toggleTreeModal(null, null, null)} />
      </div>
    );
  }
}
