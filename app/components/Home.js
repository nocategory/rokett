// @flow
import React, { Component } from 'react';
import Transition from 'react-motion-ui-pack';
import PanelGroup from 'react-panelgroup';
import Tree from '../components/Tree/Tree';
import TopBar from '../components/TopBar/TopBar';
import Sidebar from '../components/Sidebar/Sidebar';
import Titlebar from '../components/Titlebar/Titlebar';
import AppLayer from '../components/AppLayer/AppLayer';
import Settings from '../components/Settings/Settings';
import Editor from '../components/Editor/Editor';

export default class App extends Component {

  state: Object;
  handlePanelUpdate: Function;

  constructor() {
    super();
    this.state = {
      panelWidths: [
        { size: 240, minSize: 240, resize: 'dynamic' }
      ]
    };
    this.handlePanelUpdate = this.handlePanelUpdate.bind(this);
  }

  handlePanelUpdate(widths: Object) {
    this.setState({ panelWidths: widths });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.fileTreeVisible !== nextProps.fileTreeVisible) {
      if (!nextProps.fileTreeVisible) this.handlePanelUpdate([{ size: 0, minSize: 0, resize: 'dyanmic' }])
      else this.handlePanelUpdate([{ size: 240, minSize: 240, resize: 'dynamic' }])
    }
  }

  render() {
    const { settingsVisible, fileTreeVisible } = this.props;
    return (
      <div className="app">
        <div
          className="flex-horizontal flex1"
          style={{
            height: '100%'
          }}
        >
          <Titlebar {...this.props} />

          <div className="app--content flex1" id="app--content">
            <div className="flex-horizontal flex1" style={{ alignSelf: 'stretch' }}>
              <Sidebar {...this.props} />
              <PanelGroup
                panelWidths={this.state.panelWidths}
                onUpdate={this.handlePanelUpdate}
              >
                <Tree {...this.props} />
                <div className="flex-vertical flex1" style={{ maxWidth: '100%' }}>
                  <TopBar {...this.props} />
                  <Editor {...this.props} />
                </div>
              </PanelGroup>
            </div>
          </div>
          <Transition
            component={false}
            measure={false}
            enter={{
              opacity: 1,
              scale: 1,
            }}
            leave={{
              opacity: 0,
              scale: 0.8,
            }}
          >
            {settingsVisible &&
              <div key="settings" className="layer">
                <AppLayer {...this.props}>
                  <Settings {...this.props} />
                </AppLayer>
              </div>
            }
          </Transition>
        </div>
      </div>
    );
  }
}
