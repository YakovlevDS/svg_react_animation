import React, { Component } from "react";
import { Group } from "react-konva";
import AnimatedPathItem from "./AnimatedPathItem";
import { getPathLength, splitPath } from "./AnimatedPathUtils";

export default class AnimatedPath extends Component {
  constructor(props) {
    super(props);

    const { animation, data, duration } = props;

    this.isAnimating = animation === "play";
    this.currentPathIndex = 0;
    this.paths = splitPath([data]).map(path => ({
      data: path,
      duration: duration * (getPathLength(path) / getPathLength(data)),
      progress: 1,
      animationTimeStart: null
    }));

    this.state = {
      progress: this.paths.map(path => path.progress)
    };

    this.animate = this.animate.bind(this);

    if (this.isAnimating) {
      this.startAnimation();
    }
  }

  animate() {
    this.updatePathProgress(this.currentPathIndex);
    this.updateProgressState();

    if (this.isPathDone(this.currentPathIndex)) {
      if (this.isAnimationDone()) {
        this.stopAnimation();
      } else {
        this.startPathAnimation(this.currentPathIndex + 1);
        this.requestId = requestAnimationFrame(this.animate);
      }
    } else {
      this.requestId = requestAnimationFrame(this.animate);
    }
  }

  isAnimationDone() {
    return this.paths.reduce(
      (result, path) => result && path.progress >= 1,
      true
    );
  }

  startAnimation() {
    this.isAnimating = false;
    this.paths = this.paths.map(path => ({
      ...path,
      progress: 0
    }));
    this.startPathAnimation(0);
    this.requestId = requestAnimationFrame(this.animate);
  }

  startPathAnimation(pathIndex) {
    this.currentPathIndex = pathIndex;
    this.paths[pathIndex].progress = 0;
    this.paths[pathIndex].animationTimeStart = Date.now();
  }

  updatePathProgress(pathIndex) {
    const { animationTimeStart, duration } = this.paths[pathIndex];
    const progress = (Date.now() - animationTimeStart) / duration;

    this.paths[pathIndex].progress = progress;
  }

  isPathDone(pathIndex) {
    return this.paths[pathIndex].progress >= 1;
  }

  stopAnimation() {
    const { requestId } = this;

    cancelAnimationFrame(requestId);

    this.isAnimating = false;
    this.paths = this.paths.map(path => ({
      ...path,
      progress: 1
    }));
  }

  updateProgressState() {
    const progress = this.paths.map(path => path.progress);

    this.setState({
      progress
    });
  }

  componentDidUpdate(prevProps) {
    const { animation } = this.props;

    if (prevProps.animation !== animation) {
      switch (animation) {
        case "play":
          return this.startAnimation();
        case "stop":
          return this.stopAnimation();
        default:
          throw new Error("Unknown state: " + animation);
      }
    }
  }

  render() {
    const { animation, duration, data, ...props } = this.props;
    const { paths } = this;
    const { progress } = this.state;

    return (
      <Group>
        {paths.map((path, index) => (
          <AnimatedPathItem
            key={index}
            data={path.data}
            progress={progress[index]}
            {...props}
          />
        ))}
      </Group>
    );
  }
}
