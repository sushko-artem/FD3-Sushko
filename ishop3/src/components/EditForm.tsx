import type { IShopProps } from "@shared/interfaces/shop.props";
import React, { Component } from "react";
import ProductFormLayout from "ui/product-form-layout";

type EditFormPropsType = IShopProps["products"][number];

export default class EditForm extends Component<EditFormPropsType> {
  state = {
    inputFields: this.props,
  };
  componentDidUpdate(prevProps: EditFormPropsType): void {
    if (prevProps !== this.props) {
      this.setState({
        inputFields: this.props,
      });
    }
  }
  render(): React.ReactNode {
    return <ProductFormLayout {...this.state.inputFields}></ProductFormLayout>;
  }
}
