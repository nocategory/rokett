// @flow
import React, { Component } from 'react';
import * as ace from 'brace';
import { VelocityComponent } from 'velocity-react';
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';
import 'brace/ext/language_tools';
import 'brace/ext/emmet';
// Requirejs
import path from 'path';
import AceEditor from './ace';
import Sidebar from '../components/Sidebar/Sidebar';
import TopHeader from '../components/TopHeader/TopHeader';
import FrameButtons from '../components/FrameButtons/FrameButtons';
import Modal from '../components/Modal/Modal';
import Tree from '../components/Tree/Tree';

const y = 'css';

function requireMode(r) {
  return require('brace/mode/' + r);
}
requireMode(y);
/**
 * ACE editor modes file names differs from brace's
 */
ace.config.set('modePath', 'ace_modes');
const languageTools = ace.acequire('ace/ext/language_tools');
const emmet = ace.acequire('ace/ext/emmet');


export default class App extends Component {
  render() {
    return (
      <div>
        <VelocityComponent animation="transition.fadeIn" duration={500} runOnMount>
          <div>
            <FrameButtons {...this.props} />
            <div className="flex-vertical">

              {/* sidebar */}
              <Sidebar {...this.props} />

              {/* pane 1 */}
              <Tree {...this.props} />

              {/* pane 2 */}
              <div className="app--content" id="app--content">
                <TopHeader />
                <AceEditor
                  mode={this.props.editorMode}
                  theme="tomorrow"
                  onChange={this.onChange}
                  name="editor"
                  fontSize={17}
                  width={'100%'}
                  value={this.props.editorContent}
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
          </div>
        </VelocityComponent>
        <Modal {...this.props} />
      </div>
    );
  }
}
