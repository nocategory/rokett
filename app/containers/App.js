// @flow
import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import dirTree from 'directory-tree';
import walk from 'walkdir';
import p from 'path';
import Sidebar from '../components/Sidebar/Sidebar';
import TopHeader from '../components/TopHeader/TopHeader';
import FrameButtons from '../components/FrameButtons/FrameButtons';
import Modal from '../components/Modal/Modal';
import { Treebeard } from 'react-treebeard';

// // // // // // // //
// import fs from 'fs-extra';


const fileFolders = [];
let lastPath = '';

const treeChevron = {

}

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  constructor() {
    super();
    this.state = {};
    this.onToggle = this.onToggle.bind(this);
  }

  componentWillMount() {
    this.tree = dirTree('L:\\Users\\joaoz\\Desktop\\quarkz\\app\\components');
    console.log(this.tree);
    //
    // this.tt('L:\\Users\\joaoz\\Desktop\\quarkz\\app\\components', 'filetree');
  }

  componentDidMount() {
    // this.getFilesandFolders(this.tree);
  }

  onToggle(node, toggled) {
    if(this.state.cursor){this.state.cursor.active = false;}
    node.active = true;
    if(node.children){ node.toggled = toggled; }
    this.setState({ cursor: node });
   }

  getFilesandFolders(y) {
    for (let i = 0, len = y.children.length; i < len; i += 1) {
      if (y.children[i].extension == null) { // @folder
        // comparing w null here instead of !extension since
        // extension might be "" which indicates no extension but still, a file

        console.log(`folder: ${y.children[i].name}`);
        if (y.children[i].path.indexOf(lastPath) === -1 || lastPath === '') {
          console.log(y.children[i].path + ' and ' + lastPath);
          fileFolders.push(
            <p className="tree-folder expanded" key={y.children[i].path} data-path={y.children[i].path} onClick={() => console.log('click')}>
              <i className="fa fa-folder" aria-hidden="true" />
              {y.children[i].name}
            </p>
          );
        }
        else {
          console.log(y.children[i].path + ' and ' + lastPath);
          fileFolders.push(
            <p className="tree-folder children collapsed" key={y.children[i].path} data-path={y.children[i].path} onClick={() => console.log('click')}>
              <i className="fa fa-folder" aria-hidden="true" />
              {y.children[i].name}
            </p>
          );
        }

        lastPath = y.children[i].path;
        this.getFilesandFolders(y.children[i]);
      }
      else { // @file
        console.log(`file: ${y.children[i].name}`);
        fileFolders.push(
          <p className="tree-folder children collapsed" key={y.children[i].path} data-path={y.children[i].path} onClick={() => console.log('click')}>
            <i className="fa fa-file" aria-hidden="true" />
            {y.children[i].name}
          </p>
        );
      }
    }
    // return [folders, files];
    return this.setState({
      filetree: fileFolders,
    });
  }

  tt(y, x) {
    let emitter = walk(y, { "no_recurse": true });
    emitter.on('file', (filename, stat) => {
      console.log('file from emitter: ', filename);
      fileFolders.push(
        <p className="tree-folder children collapsed" key={filename} data-path={filename} onClick={() => console.log('click')}>
          <i className="fa fa-file" aria-hidden="true" />
          {p.basename(filename)}
        </p>
      );
    });
    emitter.on('directory', (path, stat) => {
      let name = p.basename(path);
      console.log('directory from emitter: ', path);
      fileFolders.push(
        <ol className="tree-folder expanded" key={path} data-path={path} onClick={() => tt(path, )}>
          <i className="fa fa-folder" aria-hidden="true" />
          {name}
          {this.state.name}
        </ol>
      );
    });
    emitter.on('end', () => {
      return this.setState({
        filetree: fileFolders,
      });
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

            {/* sidebar */}
            <Sidebar />

            {/* pane 1 */}
            <div className="app--tree">
              <div>
                <Treebeard
                  data={this.tree}
                  onToggle={this.onToggle}
                />
              </div>
              <div className="tree-chevron-wrapper">
                <i className="fa fa-chevron-right" style={treeChevron} />
              </div>
            </div>

            {/* pane 2 */}
            <div className="app--content" id="app--content">
              <TopHeader />
              {this.props.children}
              <div id="editor"></div>
              <div className="tabs-wrapper">
                <div className="tabs-chevron-wrapper">
                  <i className="fa fa-chevron-up" style={treeChevron} />
                </div>
              </div>
            </div>

          </div>
          {/* <Modal /> */}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
