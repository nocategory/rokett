// @flow
import React, { Component, PropTypes } from 'react';
import SplitPane from 'react-split-pane';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import dirTree from 'directory-tree';
import Sidebar from '../components/Sidebar/Sidebar';
import TopHeader from '../components/TopHeader/TopHeader';
import FrameButtons from '../components/FrameButtons/FrameButtons';
import Modal from '../components/Modal/Modal';

// // // // // // // //
// import fs from 'fs-extra';

const noCursorResize = {
  display: 'none',
};

let z = 0;
const fileFolders = [];
let lastPath = '';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  constructor() {
    super();
    this.state = {
      folders: '',
      files: '',
    };
  }

  componentWillMount() {
    this.tree = dirTree('L:\\Users\\joaoz\\Desktop\\quarkz\\app\\components');
    console.log(this.tree);
  }

  componentDidMount() {
    this.xx(this.tree, false);
  }

  getNewTree(q) {
    console.log('Q: ' + q);
  }

  xx(y) {
    /* if (z === 0) { // @root folder
      console.log(`root folder: ${y.name}`);
      folders.push(<h1>{y.name}</h1>);
    }*/
    // console.log(y);
    for (let i = 0, len = y.children.length; i < len; i += 1) {
      if (y.children[i].extension == null) { // @folder
        // comparing w null here instead of !extension since
        // extension might be "" which indicates no extension but still, a file

        console.log(`folder: ${y.children[i].name}`);
        if (y.children[i].path.indexOf(lastPath) === -1 || lastPath === '') {
          console.log('NOT CHILDREN');
          console.log(y.children[i].path + ' and ' + lastPath);
          fileFolders.push(<p className="tree-folder expanded" data-path={y.children[i].path} onClick={() => this.getNewTree(this)}><i className="fa fa-folder" aria-hidden="true"></i>{y.children[i].name}</p>);
        }
        else {
          console.log('CHILDREN');
          console.log(y.children[i].path + ' and ' + lastPath);
          fileFolders.push(<p className="tree-folder children collapsed" data-path={y.children[i].path} onClick={() => this.getNewTree(y.children[i].path)}><i className="fa fa-folder" aria-hidden="true"></i>{y.children[i].name}</p>);
        }

        lastPath = y.children[i].path;


        this.xx(y.children[i]);
      }
      else { // @file
        console.log(`file: ${y.children[i].name}`);
        fileFolders.push(<p className="tree-folder children collapsed" data-path={y.children[i].path} onClick={() => this.getNewTree(this)}><i className="fa fa-file" aria-hidden="true"></i>{y.children[i].name}</p>);
      }
    }
    // return [folders, files];
    return this.setState({
      filetree: fileFolders,
    });
  }

  render() {
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}
        >
          <FrameButtons />
          <div className="flex-vertical">
            <SplitPane split="vertical" allowResize={false} minSize={90} defaultSize={90} resizerStyle={noCursorResize}>
              <Sidebar />
              <SplitPane split="vertical" minSize={200} defaultSize={240}>
                {/* pane 1 */}
                <div className="app--sidebar">
                  <div>{this.state.filetree}</div>
                </div>

                {/* pane 2 */}
                <div className="flex-grow">
                  <div className="app--content" id="app--content">
                    <TopHeader />
                    {this.props.children}
                  </div>
                </div>

              </SplitPane>
            </SplitPane>
          </div>
          {/* <Modal /> */}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
