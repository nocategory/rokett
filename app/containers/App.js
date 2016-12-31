// @flow
import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // TO USE VELOCITY LATER
import fs from 'fs';
import { Treebeard } from 'react-treebeard';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';
import 'brace/ext/language_tools';
import 'brace/ext/emmet';
import dirTree from '../directory-tree';
import Sidebar from '../components/Sidebar/Sidebar';
import TopHeader from '../components/TopHeader/TopHeader';
import FrameButtons from '../components/FrameButtons/FrameButtons';


// // // // // // // //
let content;

const treeStyle = {
  zIndex: 99,
  WebkitAppRegion: 'no-drag',
};

export default class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.onToggle = this.onToggle.bind(this);
  }

  componentWillMount() {
    this.tree = dirTree('L:\\Users\\joaoz\\Desktop\\quarkz\\app\\components');
  }

  // file tree
  onToggle(node, toggled) {
    if (this.state.cursor) { this.state.cursor.active = false; }
    node.active = true;
    if (node.children) { node.toggled = toggled; }
    if (node.extension !== '') {
      content = this.getFileContent(node.path);
      console.log('content: ' + content);
    }
    else {
      content = '';
    }
    this.setState({ cursor: node });
  }

  getFileContent(y) {
    fs.readFile(y, 'utf8', (err, data) => {
      if (err) {
        return console.log(err);
      }
      this.setState({
        value: data
      });
      return data;
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
            <Sidebar {...this.props} />

            {/* pane 1 */}
            <div className="app--tree">
              <div style={treeStyle}>
                <Treebeard
                  data={this.tree}
                  onToggle={this.onToggle}
                />
              </div>
              <div className="tree-chevron-wrapper">
                <i className="fa fa-chevron-right" />
              </div>
            </div>

            {/* pane 2 */}
            <div className="app--content" id="app--content">
              <TopHeader />
              <AceEditor
                mode="javascript"
                theme="tomorrow"
                onChange={this.onChange}
                name="editor"
                fontSize={17}
                value={this.state.value}
                width={'100%'}
                height={'calc(100vh - 52px - 24px)'}
                enableLiveAutocompletion
                enableBasicAutocompletion
                wrapEnabled
                focus
                editorProps={{ $blockScrolling: Infinity }}
                setOptions={{
                  animatedScroll: true,
                  scrollPastEnd: true,
                }}
              />
              <div className="tabs-wrapper">
                <div className="tabs-chevron-wrapper">
                  <i className="fa fa-chevron-up" />
                </div>
              </div>
            </div>

          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
