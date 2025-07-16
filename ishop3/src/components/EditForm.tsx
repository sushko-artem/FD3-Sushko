import React, { Component } from "react";
import type { IShopProps } from "@shared/interfaces/shop.props";
import ProductForm from "ui/product-form";
import { shallowEqual } from "shallow-equal";

type EditFormPropsType = {
  product: IShopProps["products"][number];
  closeForm: () => void;
  saveChanges: (data: IShopProps["products"][number]) => void;
};
type EditFormStateType = {
  inputFields: Array<[string, string | number]>;
};
export default class EditForm extends Component<
  EditFormPropsType,
  EditFormStateType
> {
  state = {
    inputFields: Object.entries(this.props.product).slice(1),
  };

  componentDidUpdate(prevProps: EditFormPropsType) {
    if (!shallowEqual(prevProps, this.props)) {
      this.setState({
        inputFields: Object.entries(this.props.product).slice(1),
      });
    }
  }
  onChange = (inputValue: string | number, property: string) => {
    this.setState((prevState) => ({
      inputFields: prevState.inputFields.map(([key, value]) =>
        key === property ? [key, inputValue] : [key, value]
      ),
    }));
  };

  cancel = () => {
    this.props.closeForm();
  };

  saveChanges = () => {
    const product = Object.fromEntries(this.state.inputFields);
    product.id = this.props.product.id;
    this.props.saveChanges(product as IShopProps["products"][number]);
  };

  render(): React.ReactNode {
    const { productName, id } = this.props.product;
    return (
      <ProductForm
        saveChanges={this.saveChanges}
        cancel={this.cancel}
        productName={productName}
        id={id}
        inputFields={this.state.inputFields}
        title="Edit product:"
        buttonText="Save"
        onChange={this.onChange}
      ></ProductForm>
    );
  }
}
