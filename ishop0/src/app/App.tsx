import React, { Component } from "react";
import Shop from "@components/Shop";
import { DATA } from "@constants/data";
import { IShopProps } from "@interfaces/shop.props";

const props: IShopProps = {
  name: DATA.title.name,
  address: DATA.title.address,
  products: DATA.products,
};
export default class App extends Component {
  render(): React.ReactNode {
    return (
      <div className="container mx-auto px-3 sm:px-4 lg:px-5">
        <Shop {...props} />
      </div>
    );
  }
}
