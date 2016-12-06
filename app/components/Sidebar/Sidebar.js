// @flow
import React, { Component } from 'react';
import s from './Sidebar.css';

const settingsButton = {
  fontSize: '2.2em',
};

export default class Sidebar extends Component {
  render() {
    return (
      <div className={s.sidebarWrapper}>
        <div className={s.sidebar}>
          <div className={s.sidebarButtons}>
            <hr />
            <i className="fa fa-cog" aria-hidden="true" style={settingsButton} />
          </div>
        </div>
      </div>
    );
  }
}
