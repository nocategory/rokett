// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from './App';
import * as ModalActions from '../actions/modal';
import * as EditorActions from '../actions/editor';

function mapStateToProps(state) {
  return {
    modalVisible: state.modal.modalVisible,
    editorContent: state.editor.editorContent,
    currentFilePath: state.editor.currentFilePath,
    editorMode: state.editor.editorMode,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...ModalActions, ...EditorActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
