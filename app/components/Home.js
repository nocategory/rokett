// @flow
import React, { Component } from 'react';
import Transition from 'react-motion-ui-pack';
import Sidebar from '../components/Sidebar/Sidebar';
import Tree from '../components/Tree/Tree';
import TopHeader from '../components/TopHeader/TopHeader';
import Titlebar from '../components/Titlebar/Titlebar';
import AppLayer from '../components/AppLayer/AppLayer';
import Settings from '../components/Settings/Settings';
import Editor from '../components/Editor/Editor';

export default class App extends Component {
  render() {
    const { settingsVisible, fileTreeVisible } = this.props;
    return (
      <div className="app">
        <div
          className="flex-vertical flex1"
          style={{
            height: '100%'
          }}
        >
          <div>
            <Titlebar {...this.props} />
            <TopHeader {...this.props} />
          </div>

          {/* pane 2 */}
          <div className="app--content flex1" id="app--content">
            <div className="flex-horizontal flex1 w100">
              {/* sidebar */}
              <Sidebar {...this.props} />
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
                {/* https://github.com/souporserious/react-motion-ui-pack/issues/72 */}
                {fileTreeVisible &&
                  <div key="tree" className="layer">
                    <AppLayer {...this.props}>
                      <Tree {...this.props} />
                    </AppLayer>
                  </div>
                }
              </Transition>
              <Editor {...this.props} />
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
