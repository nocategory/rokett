// @flow
import React, { Component, PropTypes } from 'react';
import SplitPane from 'react-split-pane';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Sidebar from '../components/Sidebar/Sidebar';
import DraggableArea from '../components/DraggableArea/DraggableArea';

// // // // // // // //
import fs from 'fs-extra';
import dirTree from 'directory-tree';

const noCursorResize = {
  display: 'none',
};

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  componentDidMount() {
    /*let tree = dirTree('C:/Users/joaosalg/Desktop/quarkz/app/components');
    console.log(tree.children[0]);
    console.log(tree);*/
  }

  render() {
    return (
      <div className="app--wrapper">
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}
        >
          <div className="flex-vertical">
            <SplitPane split="vertical" allowResize={false} minSize={90} defaultSize={90} resizerStyle={noCursorResize} className={'non--draggable'}>
              <Sidebar />
              <SplitPane split="vertical" minSize={200} defaultSize={240} className={'non--draggable'}>
                {/* pane 1 */}
                <div className="app--sidebar">

                </div>

                {/* pane 2 */}
                <div className="app--content--wrapper">
                  <DraggableArea />
                  <div className="app--content" id="app--content">
                    {this.props.children}
                  </div>
                </div>

              </SplitPane>
            </SplitPane>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
