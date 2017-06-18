// @flow
import React, { Component } from 'react';
import { Treebeard } from 'react-treebeard';
import chokidar from 'chokidar';
import fs from 'fs';
import s from './Tree.css';
import * as filter from './filter';
// import settings from '../../settings.json';

const treeStyle = {
  tree: {
    base: {
      listStyle: 'none',
      backgroundColor: 'inherit',
      margin: 0,
      padding: '0',
      color: '#9DA5AB',
      fontFamily: 'rubikregular',
      fontSize: '1rem',
      width: '240px',
      maxWidth: '240px'
    },
    node: {
      base: {
        position: 'relative'
      },
      link: {
        cursor: 'pointer',
        position: 'relative',
        padding: '0px 20px',
        display: 'block',
        whiteSpace: 'nowrap'
      },
      activeLink: {
        background: '#484eaf',
        borderRadius: '3px',
      },
      toggle: {
        base: {
          position: 'relative',
          display: 'inline-block',
          verticalAlign: 'top',
          marginLeft: '-5px',
          height: '24px',
          width: '24px'
        },
        wrapper: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          margin: '-9px 0 0 -9px',
          height: '11px'
        },
        height: 11,
        width: 11,
        arrow: {
          fill: '#9DA5AB',
          strokeWidth: 0
        }
      },
      header: {
        base: {
          display: 'inline-block',
          verticalAlign: 'top',
          color: '#9DA5AB'
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
        paddingLeft: '27px'
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

  componentWillReceiveProps(nextProps) {
    if (this.props.currentFolderPath !== nextProps.currentFolderPath) {
      console.log('%c ' + JSON.stringify(nextProps.currentFolderPath), 'background: rgb(72, 78, 175); margin: 25px; color: #FFF');
      // Ignore node_modules folder
      this.setState({ data: nextProps.currentFolderJSON });
      const watcher = chokidar.watch(nextProps.currentFolderPath, { ignoreInitial: true, ignored: (/node_modules[/]?/) });
      const watchedPaths = watcher.getWatched();
      if (watchedPaths) {
        watcher.unwatch(this.props.currentFolderPath);
      }
      watcher
        .on('all', (event, path) => {
          console.log(event, path);
          console.log('%c Oh my heavens! chokidar twerked ', 'background: rgb(72, 78, 175); margin: 25px; color: #FFF');
          this.props.setActiveFolder(nextProps.currentFolderPath);
          const filters = '*';
          if(!filters){ return this.setState({ data: nextProps.currentFolderJSON }); }
          var filtered = filter.filterTree(nextProps.currentFolderJSON, filters);
          console.log('FILTERED: ' + JSON.stringify(filtered));
          filtered = filter.expandFilteredNodes(filtered, filters);
          this.setState({ data: filtered });
          const cursor = this.state.cursor;
          this.setState({ cursor });
          console.log('END WATCHER');
        });
    }
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
    console.log("Cursor state on node click: " + JSON.stringify(this.state.cursor));
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
    const { currentFolderJSON } = this.props;
    const treeSidebarStyle = {
      zIndex: 99,
      WebkitAppRegion: 'no-drag',
    };

    return (
      <div className={s.treeWrapper} style={{ background: 'rgba(28, 29, 37, 0.7)' }}>
        {(() => {
          if (currentFolderJSON) {
            return (
              <div className={s.fileTreeSidebar} style={treeSidebarStyle}>
                <Treebeard
                  data={this.state.data || {}}
                  onToggle={this.onToggle}
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
