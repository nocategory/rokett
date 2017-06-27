// @flow
import React, { Component } from 'react';
import { Treebeard, decorators } from 'react-treebeard';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import className from 'classnames';
import chokidar from 'chokidar';
import fs from 'fs';
import deep from 'deep-diff';
import empty from 'is-empty';
import s from './Tree.css';
import dirTree from '../../directory-tree';
// import settings from '../../settings.json';

const treeStyle = {
  tree: {
    base: {
      listStyle: 'none',
      backgroundColor: 'inherit',
      margin: 0,
      padding: '12.5px',
      color: '#FFF',
      fontFamily: 'rubikregular',
      fontSize: '1.2em',
      width: '100%'
    },
    node: {
      base: {
        position: 'relative',
        padding: '2.2px',
        cursor: 'pointer'
      },
      link: {
        cursor: 'pointer',
        position: 'relative',
        padding: '1.5px 7px',
        display: 'block',
        whiteSpace: 'nowrap'
      },
      activeLink: {
        background: 'rgba(144, 144, 144, 0.2)',
      },
      toggle: {
        base: {
          position: 'relative',
          display: 'inline-block',
          verticalAlign: 'top',
          marginLeft: '0px',
          height: '16px',
          width: '16px'
        },
        wrapper: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          margin: '-10px 0 0 -7px',
          height: '11px'
        },
        height: 9,
        width: 9,
        arrow: {
          fill: '#FFF',
          strokeWidth: 0
        }
      },
      header: {
        base: {
          display: 'inline-block',
          verticalAlign: 'top',
          color: '#FFF',
          opacity: '0.8'
        },
        connector: {
          width: '2px',
          height: '12px',
          borderLeft: 'solid 2px black',
          borderBottom: 'solid 2px black',
          position: 'absolute',
          top: '0px',
          left: '-21px'
        },
        title: {
          lineHeight: '24px',
          verticalAlign: 'middle'
        }
      },
      subtree: {
        listStyle: 'none',
        paddingLeft: '25px'
      },
      loading: {
        color: '#E2C089'
      }
    }
  }
};


export default class Tree extends Component {

  state: Object;
  onToggle: Function;
  editorContentCallback: Function;

  constructor() {
    super();
    this.state = {};
    this.onToggle = this.onToggle.bind(this);
    this.editorContentCallback = this.editorContentCallback.bind(this);
  }

  componentWillReceiveProps(nextProps: Object) {
    if (this.props.currentFolderPath !== nextProps.currentFolderPath) {
      const data = dirTree(nextProps.currentFolderPath);
      if (data) {
        this.setState({ data });
      } else return this.setState({ data: null });
      // Start watching the files inside the chosen directory,
      // ignore node_modules if it exists since... it's quite big

      const watcher = chokidar.watch(nextProps.currentFolderPath, { ignoreInitial: true, ignored: (/node_modules[/]?/) });
      const watchedPaths = watcher.getWatched();
      if (watchedPaths) {
        watcher.unwatch(this.props.currentFolderPath);
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
  }

  chokidarFired() {
    const newData = dirTree(this.props.currentFolderPath);
    let currentData = this.state.data;
    const observableDiff = deep.observableDiff;
    observableDiff(currentData, newData, (d) => {
      if (!d.path || !(d.path.length > 0)) {
        currentData = {};
        return currentData;
      }
      // Apply all changes except those to the 'name' property...
      if (d.path.join('.').indexOf('toggled') === -1 && d.path.join('.').indexOf('active') === -1) {
        deep.applyChange(currentData, newData, d);
      }
    });
    return this.setState({ data: currentData });
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
    console.log(currentNode);
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

  render() {
    const treeSidebarStyle = {
      zIndex: 99,
      WebkitAppRegion: 'no-drag',
    };

    decorators.Header = (props) => {
      console.log(props);
      const style = props.style;
      const iconType = props.node.type;
      let iconClass;
      let iconExt;
      if (iconType === 'file') {
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
      const iconStyle = { marginRight: '5px' };
      return (
        <div style={style.base}>
          <div style={style.title}>
            {iconType === 'directory' &&
              <decorators.Toggle style={props.style.toggle} />
            }
            <i className={iconClass} style={iconStyle} />
            {props.node.name}
          </div>
        </div>
      );
    };

    decorators.Container = (props) => (
      <div onClick={props.onClick}>
        <ContextMenuTrigger id="test">
          <decorators.Header {...props} />
        </ContextMenuTrigger>

        <ContextMenu id="test" className={s.contextMenu}>
          <MenuItem attributes={{ className: s.menuItem }}>
            ContextMenu Item 1
          </MenuItem>
          <MenuItem attributes={{ className: s.menuItem }}>
            ContextMenu Item 2
          </MenuItem>
          <MenuItem divider />
          <MenuItem attributes={{ className: s.menuItem }}>
            ContextMenu Item 3
          </MenuItem>
        </ContextMenu>
      </div>
      );

    return (
      <div className={s.treeWrapper} style={{ background: 'rgba(28, 29, 37, 0.7)' }}>
        {(() => {
          if (!empty(this.state.data)) {
            return (
              <div className={s.fileTreeSidebar} style={treeSidebarStyle}>
                <Treebeard
                  data={this.state.data || {}}
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
