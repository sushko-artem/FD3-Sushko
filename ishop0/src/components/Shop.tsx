import React, { Component } from "react";
import { IShopProps } from "@interfaces/shop.props";
import Head from "@components/Head";
import Product from "@components/Product";

export default class Shop extends Component<IShopProps> {
  render(): React.ReactNode {
    return (
      <>
        <Head name={this.props.name} address={this.props.address} />
        <main className="mt-4 grid gap-2">
          {this.props.products.map((item) => (
            <Product
              key={item.id}
              productName={item.productName}
              price={item.price}
              photoURL={item.photoURL}
              count={item.count}
            />
          ))}
        </main>
      </>
    );
  }
}
