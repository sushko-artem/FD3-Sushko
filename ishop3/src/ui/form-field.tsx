import { Label } from "@radix-ui/react-label";
import { Input } from "@shared/ui/input";
import React, { Component } from "react";

type InputPropsType = [name: string, value: string | number];
type FormFieldPropsType = {
  input: InputPropsType;
  onChange: () => void;
};

export default class FormField extends Component<FormFieldPropsType> {
  setInputType = () => {
    if (this.props.input[0] === "photoURL") {
      return "url";
    } else if (this.props.input[0] === "productName") {
      return "text";
    } else {
      return "number";
    }
  };

  onChange = () => {
    this.props.onChange();
  };

  render(): React.ReactNode {
    const { input } = this.props;
    return (
      <div className="mt-1.5">
        <Label htmlFor={input[0]} className="mb-1">
          {input[0]}:
        </Label>
        <Input
          value={input[1]}
          type={this.setInputType()}
          id={input[0]}
          autoComplete="off"
          onChange={this.onChange}
        ></Input>
      </div>
    );
  }
}
