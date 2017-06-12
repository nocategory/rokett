// @flow
import React, { Component } from 'react';
import { Treebeard } from 'react-treebeard';
import fs from 'fs';
import s from './Tree.css';
import settings from '../../settings.json';

const tree = {
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

  // file tree
  onToggle(node: Object, toggled: boolean) {
    const currentNode = node;
    if (this.state.cursor) {
      this.state.cursor.active = false;
    }
    currentNode.active = true;
    if (node.children) {
      currentNode.toggled = toggled;
    }
    if (node.extension || node.extension === '') { // file
      this.getFileContent(node.path);
    }
    this.setState({ cursor: node });
    console.log(this.state.cursor);
  }

  getFileContent(path: string) {
    fs.readFile(path, 'utf8', (err, data) => {
      this.editorContentCallback(data, path);
    });
  }

  editorContentCallback(initContent: string, filePath: string) {
    /** call redux action to set
     * editor content
     */
    const { setEditorContent } = this.props;
    setEditorContent(initContent, filePath);
  }

  render() {
    const { currentFolderJSON } = this.props;
    const treeStyle = {
      zIndex: 99,
      WebkitAppRegion: 'no-drag',
    };

    return (
      <div className={s.treeWrapper} style={{ background: 'rgba(28, 29, 37, 0.7)' }}>
        {(() => {
          if (currentFolderJSON) {
            return (
              <div className={s.fileTreeSidebar} style={treeStyle}>
                <Treebeard
                  data={currentFolderJSON || {}}
                  onToggle={this.onToggle}
                  animations={false}
                  style={tree}
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
