import type { IShopProps } from "@interfaces/shop.props";
import React, { Component } from "react";

type HeadPropsType = Omit<IShopProps, "products">;

export default class Head extends Component<HeadPropsType> {
  render(): React.ReactNode {
    return (
      <header className="text-center mt-2">
        <h1 className="bg-gradient-to-b from-[#f5fdfd] to-[#79F3F1FF] bg-clip-text text-transparent text-6xl font-extrabold">
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
