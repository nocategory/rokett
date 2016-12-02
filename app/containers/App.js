// @flow
import React, { Component, PropTypes } from 'react';
import SplitPane from 'react-split-pane';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import DraggableArea from '../components/DraggableArea/DraggableArea';

// // // // // // // //
import fs from 'fs-extra';
import dirTree from 'directory-tree';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  componentDidMount() {
    let tree = dirTree('C:/Users/joaosalg/Desktop/quarkz/app/components');
    console.log(tree);
    let items = [];
    fs.walk('C:/Users/joaosalg/Desktop/quarkz/app/components')
      .on('data', (item) => {
        items.push(item.path);
      })
      .on('end', () => {
        console.dir(items);
      });
  }

  render() {
    return (
      <div className="app--wrapper">
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}
        >
          <SplitPane split="vertical" minSize={200} defaultSize={240} className={'non--draggable'}>

            {/* pane 1 */}
            <div className="app--sidebar">

            </div>

            {/* pane 2 */}
            <div className="app--content--wrapper">
              <DraggableArea />
              <div className="app--content" id="app--content">
                {this.props.children}
              </div>
            </div>

            <span className="Resizer" />
          </SplitPane>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
