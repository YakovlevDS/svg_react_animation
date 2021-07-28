import "./styles.css";

import React, { Component } from "react";
import ReactDOM from "react-dom";
import Konva from "konva";
import { Stage, Layer } from "react-konva";
import AnimatedPath from "./AnimatedPath";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animation: "stop"
    };
  }

  render() {
    const { animation } = this.state;

    return (
      <div>
        <button
          onClick={() => {
            this.setState({
              animation: this.state.animation === "stop" ? "play" : "stop"
            });
          }}
        >
          {this.state.animation === "stop" ? "play" : "stop"}
        </button>
        <Stage width={window.innerWidth - 20} height={window.innerHeight - 50}>
          <Layer>
            <AnimatedPath
              duration={2000}
              animation={animation}
              data="M0.057,0.024c0,0,10.99,51.603,102.248,51.603c91.259,0,136.172,53.992,136.172,53.992"
              stroke="red"
              strokeWidth={15}
              lineCap="round"
              fill="transparent"
            />
          </Layer>
        </Stage>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
