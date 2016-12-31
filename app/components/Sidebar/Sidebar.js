// @flow
import React, { Component } from 'react';
import { VelocityComponent } from 'velocity-react';
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import s from './Sidebar.css';

const settingsButton = {
  fontSize: '1.5em',
};

export default class Sidebar extends Component {
  render() {

    return (
      <div className={s.sidebarWrapper}>
        <div className={s.sidebar}>
          <div className={s.sidebarButtons}>
            <hr />
            <i className="fa fa-cog" aria-hidden="true" style={settingsButton} onClick={this.props.modalOverlayClick} />
          </div>
        </div>
      </div>
    );
  }
}
