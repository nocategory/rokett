// @flow
import React, { Component } from 'react';
import { spring } from 'react-motion';
import Transition from 'react-motion-ui-pack';
import s from './AppLayer.css';

export default class Modal extends Component {
  render() {
    const { settingsVisible } = this.props;
    // @TODO: actual settings with section names n stuff
    return (
      <Transition
        component={false} // don't use a wrapping component
        enter={{
            // translateY: 0,
          scale: 1,
          opacity: 1,
        }}
        leave={{
            // translateY: -window.innerHeight,
          scale: 0.8,
          opacity: 0,
        }}
      >
        {settingsVisible &&
        <div className={s.modal} key={1}>
          <div className="flex-vertical h100">
            {this.props.children}
          </div>
        </div>
        }
      </Transition>
    );
  }
}
