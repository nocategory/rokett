// @flow
import React, { Component, PropTypes } from 'react';
import SplitPane from 'react-split-pane';
import DraggableArea from '../components/DraggableArea/DraggableArea';
import Sidebar from '../components/Sidebar/Sidebar';
import s from '../components/Sidebar/Sidebar.css';

const maxSizePane = {
  maxWidth: '25%',
};


export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div className="app--wrapper">

        <SplitPane split="vertical" minSize={200} defaultSize={200} pane1Style={maxSizePane} className={'non--draggable'}>
          {/* pane1 */}
          <div className={`${s['app--sidebar']}`} />

          {/* pane2 */}
          <div className="app--content--wrapper">
            <DraggableArea />
            <div className="app--content" id="app--content">
              {this.props.children}
            </div>
          </div>
        </SplitPane>
        <Sidebar />
        <span className="Resizer" />

      </div>
    );
  }
}
