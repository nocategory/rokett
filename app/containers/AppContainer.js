// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from './App';
import * as ModalActions from '../actions/modal';
import * as EditorActions from '../actions/editor';

function mapStateToProps(state) {
  return {
    modalVisible: state.modal.modalVisible,
    initialContent: state.editor.initialContent,
    currentFilePath: state.editor.currentFilePath,
    editorMode: state.editor.editorMode,
    currentContent: state.editor.currentContent,
    saved: state.editor.saved,
    currentFolderJSON: state.editor.currentFolderJSON,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...ModalActions, ...EditorActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
