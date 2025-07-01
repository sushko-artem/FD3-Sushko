import { IShopProps } from "@interfaces/shop.props";
import React, { Component } from "react";
import { currencyEUR } from "@helpers/euro-currency";

type ProductTypeProps = IShopProps["products"][number];

export default class Product extends Component<ProductTypeProps> {
  render(): React.ReactNode {
    return (
      <section className="justify-around xs:flex w-[95%] sm:w-[90%] md:w-[90%] lg:w-[70%] xs:h-28 border-2 border-cyan-300 rounded-lg m-auto hover:scale-105 hover:shadow-lg hover:shadow-slate-700 transition-all">
        <div className="flex xs:flex-col align-middle justify-center">
          <img
            src={this.props.photoURL}
            alt={this.props.productName}
            width={100}
          />
        </div>
        <div className="flex xs:flex-col justify-center">
          <span className="font-serif mr-1">description:</span>
          <span className="text-gray-200 font-bold">
            {this.props.productName}
          </span>
        </div>
        <div className="flex xs:flex-col justify-center text-center">
          <span className="font-serif mr-1">available:</span>
          <span className="text-gray-200 font-bold">{this.props.count}</span>
        </div>
        <div className="flex xs:flex-col justify-center">
          <span className="text-yellow-300 font-bold text-base">
            {currencyEUR(this.props.price)}
          </span>
        </div>
      </section>
    );
  }
}
