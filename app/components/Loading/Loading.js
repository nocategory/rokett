// @flow
import React, { Component } from 'react';
import { VelocityComponent } from 'velocity-react';
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import ReactTooltip from 'react-tooltip';
import Tree from '../Tree/Tree';
import s from './Loading.css';

const settingsButton = {
  fontSize: '1.7rem',
};

const userButton = {
  marginBottom: '20px',
  fontSize: '1.7rem',
};

export default class Sidebar extends Component {
  render() {
    const { toggleModal } = this.props;
    return (
      <div className={s.sidebarWrapper}>
        <div className={s.sidebar}>
          <div className={s.sidebarButtons}>
            <i className="fa fa-user-circle" data-border data-place="right" data-for="userButton" data-effect="float" data-tip="Account settings" aria-hidden="true" style={userButton} />
            <ReactTooltip id="userButton" />
            <i className="fa fa-cog" data-border data-place="right" data-for="settingsButton" data-effect="float" data-tip="Settings" aria-hidden="true" style={settingsButton} onClick={toggleModal} />
            <ReactTooltip id="settingsButton" />
          </div>
        </div>
        <div className="tree-chevron-wrapper">
          <i className="fa fa-chevron-right" />
        </div>
        {/* app tree */}
        <div className="app--tree">
          {this.props.currentFolderJSON &&
            <Tree {...this.props} />
          }
        </div>
      </div>
    );
  }
}
