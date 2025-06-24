import React, { Component } from "react";

export default class Shop extends Component {
  render() {
    return (
      <header className="text-center mt-2">
        <h1 className="bg-head-gradient bg-clip-text text-transparent text-6xl font-extrabold">
          {this.props.name}
        </h1>
        <div className="border-[1px] border-cyan-300 w-[130px] m-auto"></div>
        <span className="text-amber-100 font-bold text-sm">
          {this.props.address}
        </span>
      </header>
    );
  }
}
