import React, { Component } from "react";
import { IShopProps } from "@interfaces/shop.props";
import Head from "@components/Head";
import Product from "@components/Product";

export default class Shop extends Component<IShopProps> {
  state = {
    products: this.props.products.map((product) => ({
      ...product,
      isActive: false,
    })),
  };

  setIsActive = (id: string) => {
    this.setState({
      products: this.state.products.map((product) => ({
        ...product,
        isActive: product.id === id,
      })),
    });
  };

  render(): React.ReactNode {
    return (
      <>
        <Head name={this.props.name} address={this.props.address} />
        <main className="mt-4 grid gap-2">
          {this.state.products.map((item) => (
            <Product setIsActive={this.setIsActive} key={item.id} {...item} />
          ))}
        </main>
      </>
    );
  }
}
