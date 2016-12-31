// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from './App';
import * as ModalActions from '../actions/modal';

function mapStateToProps(state) {
  return {
    modalVisible: state.modal.modalVisible,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ModalActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
