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
      <div>
          <div>
            <FrameButtons {...this.props} />
            <TopHeader {...this.props} />
            <div className="flex-vertical">
              {/* sidebar */}
              <Sidebar {...this.props} />


              {/* pane 2 */}
              <div className="app--content" id="app--content">
                <Editor {...this.props} />
                <div className="tabs-wrapper">
                  <div className="tabs-chevron-wrapper">
                    <i className="fa fa-chevron-up" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        <Modal {...this.props} />
      </div>
    );
  }
}
