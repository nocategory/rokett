// @flow
import { TOGGLE_SETTINGS, SELECT_SECTION, TOGGLE_FILETREE, TOGGLE_TREEMODAL } from '../actions/layer';

const initialState = {
  settingsVisible: false,
  selectedSection: 1,
  fileTreeVisible: true,
  treeModalVisible: false,
  treeModalType: null,
  treeModalData: null
};

export default function layer(state: Object = initialState, action: Object) {
  switch (action.type) {
    case TOGGLE_SETTINGS:
      return { ...state, settingsVisible: !state.settingsVisible };

    case TOGGLE_FILETREE:
      return { ...state, fileTreeVisible: !state.fileTreeVisible };

    case TOGGLE_TREEMODAL:
      switch (action.actionType) {
        case 'NEW_FILE':
          return { ...state, treeModalVisible: !state.treeModalVisible, treeModalType: action.actionType, treeModalData: action.node };

        case 'NEW_FOLDER':
          return { ...state, treeModalVisible: !state.treeModalVisible, treeModalType: action.actionType, treeModalData: action.node };

        case 'RENAME':
          return { ...state, treeModalVisible: !state.treeModalVisible, treeModalType: action.actionType, treeModalData: action.node };

        case 'DELETE':
          return { ...state, treeModalVisible: !state.treeModalVisible, treeModalType: action.actionType, treeModalData: action.node };

        default:
          return { ...state, treeModalVisible: !state.treeModalVisible, treeModalType: null, treeModalData: null };
      }

    case SELECT_SECTION:
      console.log(action.sectionName);
      return { ...state, selectedSection: action.sectionName };

    default:
      return state;
  }
}
