// @flow
import React, { Component, PropTypes } from 'react';
import SplitPane from 'react-split-pane';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import dirTree from 'directory-tree';
import Sidebar from '../components/Sidebar/Sidebar';
import DraggableArea from '../components/DraggableArea/DraggableArea';
import Modal from '../components/Modal/Modal';

// // // // // // // //
// import fs from 'fs-extra';

const noCursorResize = {
  display: 'none',
};

let z = 0;
const files = [];
const folders = [];

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  componentWillMount() {
    console.log('--');

    this.tree = dirTree('C:/Users/joaosalg/Desktop/quarkz/app/components/Home/');
    console.log(this.tree);
  }

  xx(y) {
    if (z === 0) { // @root folder
      console.log(`root folder: ${y.name}`);
      folders.push(<h1>{y.name}</h1>);
    }
    for (let i = 0, len = y.children.length; i < len; i += 1) {
      if (y.children[i].extension == null) { // @folder
        // using null here instead of !extension since
        // extension might be "" which indicated no extension but still, a file
        console.log(`folder: ${y.children[i].name}`);
        folders.push(<h1>{y.children[i].name}</h1>);
        // this.xx(y.children[i]);
      }
      else { // @file
        console.log(`file: ${y.children[i].name}`);
        files.push(<h3>{y.children[i].name}</h3>);
      }
      z = 1;
    }
    return [folders, files];
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
                  {/* <div>{this.xx(this.tree)}</div> */}
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
          <Modal />
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
