import React from "react";

type FramePropsType = {
  colors: string[];
  children: React.ReactNode;
};
export default class RainbowFrame extends React.Component<FramePropsType> {
  getFrame = () =>
    this.props.colors.reduce(
      (accum, color, index) => (
        <div
          key={index}
          className="m-2 text-center text-white border-5"
          style={{
            borderColor: color,
          }}
        >
          {accum}
        </div>
      ),
      this.props.children
    );

  render(): React.ReactNode {
    return this.getFrame();
  }
}
