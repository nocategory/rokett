// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

export default class App extends Component {
  props: {
    children: Children
  };

  render() {
    return (
      <I18nextProvider i18n={i18n}>
        <div>
          {this.props.children}
        </div>
      </I18nextProvider>
    );
  }
}
