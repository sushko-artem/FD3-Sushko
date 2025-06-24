import React, { Component } from "react";
import Shop from "../components/Shop";
import { DATA } from "../shared/constants";

export default class App extends Component {
  render() {
    return (
      <div className="container mx-auto px-3 sm:px-4 lg:px-5">
        <Shop name={DATA.shop.name} address={DATA.shop.address} />
      </div>
    );
  }
}
