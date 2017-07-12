// @flow
import React, { Component } from 'react';
import { Treebeard, decorators } from 'react-treebeard';
import { translate } from 'react-i18next';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import className from 'classnames';
import chokidar from 'chokidar';
import fs from 'fs';
import deep from 'deep-diff';
import empty from 'is-empty';
import Transition from 'react-motion-ui-pack';
import Modal from '../Modal/Modal';
import s from './Tree.css';
import dirTree from '../../directory-tree';
import treeStyle from './treeStyle';
// import settings from '../../settings.json';

class Tree extends Component {

  state: Object;
  onToggle: Function;
  editorContentCallback: Function;
  contextMenuId: number;

  constructor() {
    super();
    this.state = {};
    this.contextMenuId = -1;
    this.onToggle = this.onToggle.bind(this);
    this.editorContentCallback = this.editorContentCallback.bind(this);
  }

  componentDidMount() {
// Watch redux persisted file path on start
    if (this.props.currentFolderJSON) {
      this.initChokidar(this.props.currentFolderPath, false);
    }
  }

  componentWillReceiveProps(nextProps: Object) {
    if (this.props.currentFolderPath !== nextProps.currentFolderPath) {
// Start watching the files inside the chosen directory,
// ignore node_modules if it exists since... it's quite big
      this.initChokidar(nextProps.currentFolderPath, true);
    }
  }

  initChokidar(fp, prevState) {
    console.log('chokidar');
    console.log(fp);
    const watcher = chokidar.watch(fp, { ignoreInitial: true, ignored: (/node_modules[/]?/) });
    if (prevState) {
      const watchedPaths = watcher.getWatched();
      if (watchedPaths) {
        console.log('UNWATCH');
        watcher.unwatch(this.props.currentFolderPath);
      }
    }
// @TODO: Try to get multiple fs events on a single 'on' method
// doesn't look to be supported by chokidar ^
    watcher
    .on('add', (event) => {
      this.chokidarFired(event);
    })
    .on('unlink', (event) => {
      this.chokidarFired(event);
    })
    .on('unlinkDir', (event) => {
      this.chokidarFired(event);
    })
    .on('addDir', (event) => {
      this.chokidarFired(event);
    });
  }

  chokidarFired() {
    const newData = dirTree(this.props.currentFolderPath);
    let currentData = this.props.currentFolderJSON;
    const observableDiff = deep.observableDiff;
    observableDiff(currentData, newData, (d) => {
      if (!d.path || !(d.path.length > 0)) {
        currentData = {};
        return currentData;
      }
// Apply all changes except those to the 'toggled' and 'active' properties...
      if (d.path.join('.').indexOf('toggled') === -1 && d.path.join('.').indexOf('active') === -1) {
        deep.applyChange(currentData, newData, d);
      }
    });
    currentData = Object.assign({}, currentData);
    this.props.setActiveFolder(this.props.currentFolderPath, currentData);
  }

  /**
   * Triggers when any node present in the tree is clicked
   */
  onToggle(node: Object, toggled: boolean) {
    if (this.state.cursor) {
      const cursor = this.state.cursor;
      cursor.active = false;
      this.setState({ cursor });
    }
    const currentNode = node;
    currentNode.active = true;
    if (node.children) {
      currentNode.toggled = toggled;
    }
    if (node.extension || node.extension === '') { // file
      this.getFileContent(node.path);
    }
    this.setState({ cursor: node });
  }

  /**
   * Get the contents of the file just selected
   */
  getFileContent(path: string) {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) throw err;
      this.editorContentCallback(data, path);
    });
  }

  /**
   * Set the content of the editor
   */

  editorContentCallback(initContent: string, filePath: string) {
    const { setEditorContent } = this.props;
    setEditorContent(initContent, filePath);
  }

  handleClick(e, data) {
    console.log(data);
  }

  render() {
    const { t, fileTreeVisible, toggleTreeModal, treeModalVisible } = this.props;

    const treeSidebarStyle = {
      zIndex: 99,
      WebkitAppRegion: 'no-drag',
    };

    decorators.Header = (props) => {
      const style = props.style;
      const iconType = props.node.type;
      let iconClass;
      let iconExt;
      if (props.terminal) {
        if (empty(props.node.extension)) {
          iconClass = `${iconType}-icon`;
        } else if (props.node.name.indexOf('yarn') !== -1) {
          iconClass = 'devicon-yarn-plain colored';
        } else if (props.node.name.indexOf('webpack') !== -1) {
          iconClass = 'devicon-webpack-plain colored';
        } else {
          iconExt = props.node.extension.slice(1);
          iconClass = className(`devicon-${iconExt}-plain colored`);
        }
      // Directory
      } else {
        iconClass = `${iconType}-icon`;
      }
      const iconStyle = { marginRight: '5px', verticalAlign: 'middle' };
      return (
        <div style={style.base} className={s.headerStyle} onClick={props.onClick}>
          <div style={style.title}>
            {/* !props.terminal == directory */}
            {!props.terminal &&
              <decorators.Toggle style={props.style.toggle} />
            }
            <i className={iconClass} style={iconStyle} />
            <span style={{ verticalAlign: 'middle' }}>{props.node.name}</span>
          </div>
        </div>
      );
    };

    decorators.Container = (props) => {
      this.contextMenuId++;
      return (
        <div className={s.test}>
          <ContextMenuTrigger id={`headerContextTrigger${this.contextMenuId}`}>
            <decorators.Header {...props} />
          </ContextMenuTrigger>

          <ContextMenu id={`headerContextTrigger${this.contextMenuId}`} className={s.contextMenu}>
            <MenuItem attributes={{ className: s.menuItem }} data={{ node: props.node }} onClick={(event, data) => toggleTreeModal('NEW_FILE', event, data.node)}>
              {t('tree:actions:newFile')}
            </MenuItem>
            <MenuItem attributes={{ className: s.menuItem }} data={{ node: props.node }} onClick={(event, data) => toggleTreeModal('NEW_FOLDER', event, data.node)}>
              {t('tree:actions:newFolder')}
            </MenuItem>
            <MenuItem attributes={{ className: s.menuItem }} data={{ node: props.node }} onClick={(event, data) => toggleTreeModal('RENAME', event, data.node)}>
              {t('tree:actions:rename')}
            </MenuItem>
            <MenuItem attributes={{ className: s.menuItem }} data={{ node: props.node }} onClick={(event, data) => toggleTreeModal('DELETE', event, data.node)}>
              {t('tree:actions:delete')}
            </MenuItem>
          </ContextMenu>
        </div>
      );
    };

    return (
      <div className={s.treeWrapper} style={{ background: 'rgba(28, 29, 37, 0.7)' }}>
        {(() => {
          if (!fileTreeVisible) {
            return null;
          }
          if (!empty(this.props.currentFolderJSON) && treeModalVisible) {
            return (
              <div className={s.fileTreeSidebar} style={treeSidebarStyle}>
                <Treebeard
                  data={this.props.currentFolderJSON || {}}
                  onToggle={this.onToggle}
                  decorators={decorators}
                  animations={false}
                  style={treeStyle}
                />
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
                <div key="treeModal" className="modal">
                  <Modal {...this.props} />
                </div>
              </Transition>
              </div>
            );
          }
          if (!empty(this.props.currentFolderJSON) && !treeModalVisible) {
            return (
              <div className={s.fileTreeSidebar} style={treeSidebarStyle}>
                <Treebeard
                  data={this.props.currentFolderJSON || {}}
                  onToggle={this.onToggle}
                  decorators={decorators}
                  animations={false}
                  style={treeStyle}
                />
              </div>
            );
          }
          return (
            <div className={s.fileTreeInfoWrapper}>
              <div className={s.noFolderOpenIcon} />
              <p className={s.fileTreeInfo}>No files to show... <br /> :(</p>
            </div>
          );
        })()}
      </div>
    );
  }
}

export default translate(['tree'], { wait: true })(Tree);
