// @flow
import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import settings from '../../settings.json';
import s from './Sidebar.css';

const settingsButton = {
  fontSize: '1.7rem',
};

const userButton = {
  marginBottom: '20px',
  fontSize: '1.7rem',
};

const sidebarStyle = {
  backgroundColor: settings.frame.secondaryColor,
};

export default class Sidebar extends Component {
  props: {
    toggleSettings: () => void
  };

  render() {
    const { toggleSettings } = this.props;
    return (
      <div className={s.sidebarWrapper}>
        <div className={s.sidebar} style={sidebarStyle}>
          <div className={s.sidebarButtons}>
            <i className="fa fa-user-circle" data-border data-place="right" data-for="userButton" data-effect="float" data-tip="Account settings" aria-hidden="true" style={userButton} />
            <ReactTooltip id="userButton" />
            <i className="fa fa-cog" data-border data-place="right" data-for="settingsButton" data-effect="float" data-tip="Settings" aria-hidden="true" style={settingsButton} onClick={toggleSettings} />
            <ReactTooltip id="settingsButton" />
          </div>
        </div>
        {/*<div className="tree-chevron-wrapper">
          <i className="fa fa-chevron-right" />
        </div> */}
      </div>
    );
  }
}

// {this.props.currentFolderJSON &&
  // <Tree {...this.props} />
// }
