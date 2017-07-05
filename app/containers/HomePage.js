// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as editorActions from '../actions/editor';
import * as layerActions from '../actions/layer';


function mapStateToProps(state) {
  return {
    settingsVisible: state.layer.settingsVisible,
    fileTreeVisible: state.layer.fileTreeVisible,
    selectedSection: state.layer.selectedSection,
    treeModalVisible: state.layer.treeModalVisible,
    treeModalType: state.layer.treeModalType,
    treeModalData: state.layer.treeModalData,
    model: state.editor.model,

    initialContent: state.editor.initialContent,
    currentFilePath: state.editor.currentFilePath,
    currentFolderPath: state.editor.currentFolderPath,
    editorLang: state.editor.editorLang,
    languages: state.editor.languages,
    currentContent: state.editor.currentContent,
    saved: state.editor.saved,
    editorIsMounted: state.editor.editorIsMounted,
  };
}

/**
 * mapStateToProps is needed so that components know when to update,
 */

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...editorActions, ...layerActions }, dispatch);
}

// $FlowIssue
export default connect(mapStateToProps, mapDispatchToProps)(Home);
