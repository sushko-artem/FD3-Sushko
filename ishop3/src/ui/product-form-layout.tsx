import type { IShopProps } from "@shared/interfaces/shop.props";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import React, { Component } from "react";
import FormField from "./form-field";

type ProductFormPropsType = IShopProps["products"][number];

export default class ProductFormLayout extends Component<ProductFormPropsType> {
  private get inputFields() {
    return Object.entries(this.props).slice(1);
  }
  onChange = () => {};
  render(): React.ReactNode {
    const { id, productName } = this.props;
    return (
      <div className="mt-4 max-w-2xs mx-auto">
        <Card className="bg-blue-200 p-2 gap-2">
          <CardHeader className="text-center">
            <h1 className="text-xl font-extrabold">
              Edit product:
              <br />
              <span className="text-fuchsia-600">{productName}</span>
            </h1>
            <CardTitle className="text-left text-sm">ID: {id}</CardTitle>
          </CardHeader>
          <CardContent>
            {this.inputFields.map((item) => (
              <FormField
                key={id + item[0]}
                input={item}
                onChange={this.onChange}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }
}
