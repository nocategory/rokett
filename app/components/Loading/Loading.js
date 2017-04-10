// @flow
import React, { Component } from 'react';
import {
  ChasingDots,
  Circle,
  CubeGrid,
  DoubleBounce,
  FadingCircle,
  FoldingCube,
  Pulse,
  RotatingPlane,
  ThreeBounce,
  WanderingCubes,
  Wave
} from 'better-react-spinkit';
import s from './Loading.css';

const test = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#212121',
  opacity: '.4',
}

export default class Loading extends Component {
  props: {
    setEditorMount: () => void
  };

  render() {
    const { editorIsMounted } = this.props;
    return (
      <div className={s.loading}>
        <CubeGrid color="white" size={65} />
      </div>
    );
  }
}
