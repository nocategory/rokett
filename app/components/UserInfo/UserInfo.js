// @flow
import React, { Component } from 'react';
// import settings from '../../settings.json';
import s from './UserInfo.css';


export default class Sidebar extends Component {
  render() {
    return (
      <div className={s.userInfoWrapper}>
        <div className={s.userAvatar} />
        <div className={s.userName} />
      </div>
    );
  }
}

// {this.props.currentFolderJSON &&
  // <Tree {...this.props} />
// }
