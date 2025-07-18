import React, { Component } from "react";
import type { IShopProps } from "@shared/interfaces/shop.props";
import ProductForm from "ui/product-form";
import { shallowEqual } from "shallow-equal";
import { editInputEvent } from "@shared/events/eventEmitters";

type FormPropsType = {
  product: IShopProps["products"][number];
  closeForm: () => void;
  saveChanges: (data: IShopProps["products"][number]) => void;
};

type FormStateType = {
  inputFields: Array<[string, string | number, string?]>;
  isValid: boolean;
};
export default class Form extends Component<FormPropsType, FormStateType> {
  state = {
    inputFields: Object.entries(this.props.product).slice(1),
    isValid: false,
  };

  get title() {
    return this.props.product.productName ? "Edit product:" : "Create Product";
  }

  get buttonText() {
    return this.props.product.productName ? "Save" : "Add";
  }

  componentDidMount(): void {
    this.validate();
  }

  componentDidUpdate(prevProps: FormPropsType) {
    if (
      this.props.product &&
      !shallowEqual(prevProps.product, this.props.product)
    ) {
      this.setState({
        inputFields: Object.entries(this.props.product).slice(1),
      });
    }
  }

  onChange = (inputValue: string | number, property: string) => {
    editInputEvent.emit("startEdit");
    this.setState(
      (prevState) => ({
        inputFields: prevState.inputFields.map(([key, value]) =>
          key === property ? [key, inputValue] : [key, value]
        ),
      }),
      this.validate
    );
  };

  validate = () => {
    const { count, photoURL, price, productName } = Object.fromEntries(
      this.state.inputFields
    );
    const isCountValid = !isNaN(Number(count)) && Number(count) >= 0;
    const isUrlValid = /^(\/images\/[\w-]*\.)(png|svg|webp|jpg|jpeg)/.test(
      photoURL as string
    );
    const isPriceValid = (price as number) >= 0;
    const isProductNameValid =
      /^[^\s]\w+(?: [^\s]+)*$/.test(productName as string) &&
      (productName as string).length >= 2;
    const errorMessageData = {
      countMessage: isCountValid ? "" : "Must be a positive integer!",
      urlMessage: isUrlValid
        ? ""
        : "Please, fill the field! URL should be of the form: '/images/(name).(extension)'",
      priceMessage: isPriceValid ? "" : "Must be a rational number!",
      productNameMessage: isProductNameValid
        ? ""
        : "Please, fill the field! Should have at least 2 characters",
    };
    const updatedInputFields = this.state.inputFields.map(
      (item): [string, string | number, string?] => {
        const [key, value] = item;
        if (key === "productName")
          return [key, value, errorMessageData.productNameMessage];
        if (key === "price") return [key, value, errorMessageData.priceMessage];
        if (key === "photoURL")
          return [key, value, errorMessageData.urlMessage];
        if (key === "count") return [key, value, errorMessageData.countMessage];
        return [key, value];
      }
    );
    this.setState({
      isValid: isCountValid && isUrlValid && isPriceValid && isProductNameValid,
      inputFields: updatedInputFields,
    });
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
    const { isValid, inputFields } = this.state;
    return (
      <ProductForm
        isValid={isValid}
        saveChanges={this.saveChanges}
        cancel={this.cancel}
        productName={productName}
        id={id}
        inputFields={inputFields}
        title={this.title}
        buttonText={this.buttonText}
        onChange={this.onChange}
      ></ProductForm>
    );
  }
}
