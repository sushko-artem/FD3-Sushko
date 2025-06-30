import React, { Component } from "react";
import Shop from "../components/Shop";
import { DATA } from "../shared/constants";
import { IShopProps } from "../shared/interfaces";

const props: IShopProps = {
  name: DATA.title.name,
  address: DATA.title.address,
};

export default class App extends Component {
  render() {
    return (
      <div className="container mx-auto px-3 sm:px-4 lg:px-5">
        <Shop {...props} />
      </div>
    );
  }
}
