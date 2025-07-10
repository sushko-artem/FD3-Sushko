import React, { Component } from "react";
import Filter from "@components/Filter";
import { DATA } from "@constants/data";

export default class App extends Component {
  render(): React.ReactNode {
    return (
      <div className="container flex h-[100vh] mx-auto px-3 sm:px-4 lg:px-5">
        <Filter list={DATA} />
      </div>
    );
  }
}
