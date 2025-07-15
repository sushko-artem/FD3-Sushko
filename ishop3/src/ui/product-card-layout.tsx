import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import React, { Component } from "react";
import { currencyEUR } from "@helpers/euro-currency";
import type { IShopProps } from "@shared/interfaces/shop.props";

type CardPropsType = IShopProps["products"][number];

export default class CardLayout extends Component<CardPropsType> {
  render(): React.ReactNode {
    const { productName, id, photoURL, count, price } = this.props;
    return (
      <div className="mt-4 max-w-2xs mx-auto">
        <Card className="bg-blue-200 p-2 gap-2">
          <CardHeader className="text-center">
            <h1 className="text-2xl font-extrabold text-fuchsia-700">
              {productName}
            </h1>
            <CardTitle className="text-xs">id: {id}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col text-center font-bold">
            <img
              className="m-auto"
              src={photoURL}
              alt={productName}
              width={60}
            />
            <span className="mb-1 mt-1">count: {count}</span>
            <span>price: {currencyEUR(price as number)}</span>
          </CardContent>
        </Card>
      </div>
    );
  }
}
