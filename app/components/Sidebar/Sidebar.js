// @flow
import React, { Component } from 'react';
import { VelocityComponent } from 'velocity-react';
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import s from './Sidebar.css';

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
            <i className="fa fa-user-circle" aria-hidden="true" style={userButton} />
            <i className="fa fa-cog" aria-hidden="true" style={settingsButton} onClick={toggleModal} />
          </div>
        </div>
        <div className="tree-chevron-wrapper">
          <i className="fa fa-chevron-right" />
        </div>
      </div>
    );
  }
}
