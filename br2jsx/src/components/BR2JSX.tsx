import React from "react";

export default class BR2JSX extends React.Component<{ text: string }> {
  getJSXfromText = () =>
    this.props.text
      .replace(/<\w+[ *\\/]*>/g, ",")
      .split(",")
      .reduce(
        (accum, str, index) =>
          index < this.props.text.length - 1
            ? accum.concat([str, <br key={index} />])
            : accum.concat([str]),
        [] as (string | React.ReactNode)[]
      );
  render(): React.ReactNode {
    return (
      <div className="bg-amber-200 font-bold w-fit text-center mx-auto p-5">
        {this.getJSXfromText()}
      </div>
    );
  }
}
