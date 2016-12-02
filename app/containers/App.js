// @flow
import React, { Component, PropTypes } from 'react';
import SplitPane from 'react-split-pane';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import DraggableArea from '../components/DraggableArea/DraggableArea';
import Sidebar from '../components/Sidebar/Sidebar';
import s from '../components/Sidebar/Sidebar.css';

const test = {
  background: 'yellow',
};

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div className="app--wrapper">
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}
        >
          <SplitPane split="vertical" minSize={200} defaultSize={240} className={'non--draggable'}>
            {/* pane 1 */}
            <div className={`${s['app--sidebar']}`} />

            {/* pane 2 */}
            <div className="app--content--wrapper">
              <DraggableArea />
              <div className="app--content" id="app--content">
                {this.props.children}
              </div>
            </div>

            <span className="Resizer" />
          </SplitPane>
          <Sidebar />

        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
