import React, { Component } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import FormField from "./form-field";
import { Button } from "@shared/ui/button";

type ProductFormPropsType = {
  inputFields: Array<[string, string | number, string?]>;
  title: string;
  buttonText: string;
  id: string;
  productName?: string;
  isValid: boolean;
  onChange: (inputValue: string | number, property: string) => void;
  saveChanges: () => void;
  cancel: () => void;
};

export default class ProductForm extends Component<ProductFormPropsType> {
  onChange = (inputValue: string | number, property: string) => {
    this.props.onChange(inputValue, property);
  };
  saveChanges = () => {
    this.props.saveChanges();
  };
  cancel = () => {
    this.props.cancel();
  };
  render(): React.ReactNode {
    const { id, productName, title, inputFields, isValid, buttonText } =
      this.props;
    return (
      <div className="mt-4 max-w-2xs mx-auto animate-slide-up">
        <Card className="bg-blue-200 p-2 gap-2">
          <CardHeader className="text-center">
            <h1 className="text-xl font-extrabold">
              {title}
              <br />
              {!!productName && (
                <span className="text-fuchsia-600">{productName}</span>
              )}
            </h1>
            <CardTitle className="text-left text-sm">ID: {id}</CardTitle>
          </CardHeader>
          <CardContent>
            {inputFields.map((item) => (
              <FormField
                key={id + item[0]}
                input={item}
                onChange={this.onChange}
              />
            ))}
          </CardContent>
          <CardFooter className="flex justify-around mt-3">
            <Button
              disabled={!isValid}
              type="button"
              onClick={this.saveChanges}
              className="bg-cyan-600 hover:bg-cyan-700 w-[40%] active:bg-cyan-600 cursor-pointer"
            >
              {buttonText}
            </Button>

            <Button
              type="button"
              onClick={this.cancel}
              className="bg-cyan-600 hover:bg-cyan-700 w-[40%] active:bg-cyan-600 cursor-pointer"
            >
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
}
