import type { IShopProps } from "@shared/interfaces/shop.props";
import React, { Component } from "react";
import CardLayout from "ui/product-card-layout";

type ProductCardPropsType = IShopProps["products"][number];

export default class ProductCard extends Component<ProductCardPropsType> {
  render(): React.ReactNode {
    return <CardLayout {...this.props} />;
  }
}
