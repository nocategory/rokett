// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as editorActions from '../actions/editor';
import * as modalActions from '../actions/modal';


function mapStateToProps(state) {
  return {
    modalVisible: state.modal.modalVisible,
    initialContent: state.editor.initialContent,
    currentFilePath: state.editor.currentFilePath,
    editorMode: state.editor.editorMode,
    currentContent: state.editor.currentContent,
    saved: state.editor.saved,
    currentFolderJSON: state.editor.currentFolderJSON,
    editorIsMounted: state.editor.editorIsMounted,
  };
}

/**
 * mapStateToProps is needed so that components know when to update,
 */

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...editorActions, ...modalActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
