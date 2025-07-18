import { Label } from "@radix-ui/react-label";
import { Input } from "@shared/ui/input";
import React, { Component } from "react";

type InputPropsType = [name: string, value: string | number, string?];
type FormFieldPropsType = {
  input: InputPropsType;
  onChange: (inputValue: string | number, property: string) => void;
};
export default class FormField extends Component<FormFieldPropsType> {
  get inputType() {
    if (this.props.input[0] === "price") {
      return "number";
    } else if (this.props.input[0] === "count") {
      return "number";
    } else {
      return "text";
    }
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(e.target.value, e.target.id);
  };

  render(): React.ReactNode {
    const [label, inputValue, errorMessage] = this.props.input;
    return (
      <div className="mt-1.5">
        <Label htmlFor={label}>{label}:</Label>
        {<span className="text-xs text-red-600 block">{errorMessage}</span>}
        <Input
          className="border-purple-500"
          value={inputValue}
          type={this.inputType}
          id={label}
          autoComplete="off"
          onChange={this.onChange}
        />
      </div>
    );
  }
}
