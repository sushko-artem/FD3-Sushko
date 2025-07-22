import RainbowFrame from "@components/RainbowFrame";
import React, { Component } from "react";

const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "#00BFFF",
  "blue",
  "purple",
];

export default class App extends Component {
  render(): React.ReactNode {
    return <RainbowFrame colors={colors}>Hello!</RainbowFrame>;
  }
}
