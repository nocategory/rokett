// @flow
import React, { Component } from 'react';
import { VelocityComponent } from 'velocity-react';
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import Sidebar from '../components/Sidebar/Sidebar';
import TopHeader from '../components/TopHeader/TopHeader';
import FrameButtons from '../components/FrameButtons/FrameButtons';
import Modal from '../components/Modal/Modal';
import Tree from '../components/Tree/Tree';
import Editor from '../components/Editor/Editor';

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

              {/* app tree */}
              <div className="app--tree">
                {this.props.currentFolderJSON &&
                  <Tree {...this.props} />
                }
                <div className="tree-chevron-wrapper">
                  <i className="fa fa-chevron-right" />
                </div>
              </div>

              {/* pane 2 */}
              <div className="app--content" id="app--content">
                <TopHeader {...this.props} />
                <Editor {...this.props} />
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
