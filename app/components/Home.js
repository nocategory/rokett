// @flow
import React, { Component } from 'react';
import { VelocityComponent } from 'velocity-react';
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import Sidebar from '../components/Sidebar/Sidebar';
import TopHeader from '../components/TopHeader/TopHeader';
import FrameButtons from '../components/FrameButtons/FrameButtons';
import Modal from '../components/Modal/Modal';
import Editor from '../components/Editor/Editor';

export default class App extends Component {
  render() {
    return (
        <div className="app">
          <div className="flex-vertical flex1" style={{ height: '100%' }}>
            <div>
              <FrameButtons {...this.props} />
              <TopHeader {...this.props} />
            </div>

            {/* pane 2 */}
            <div className="app--content flex1" id="app--content">
              <div className="flex-horizontal flex1 w100">
                {/* sidebar */}
                <Sidebar {...this.props} />
                <Editor {...this.props} />
                <div className="tabs-wrapper">
                  <div className="tabs-chevron-wrapper">
                    <i className="fa fa-chevron-up" />
                  </div>
                </div>
              </div>
            </div>
            <Modal {...this.props} />
          </div>
        </div>
    );
  }
}
