import React, { Component } from "react";
import { Path } from "react-konva";
import { getPathLength } from "./AnimatedPathUtils";

export default class AnimatedPathItem extends Component {
  render() {
    const { data, progress, ...props } = this.props;

    if (progress === 0) {
      return null;
    }

    const pathLength = getPathLength(data);
    const dash = [progress * pathLength, pathLength];

    return <Path data={data} dash={dash} {...props} />;
  }
}
