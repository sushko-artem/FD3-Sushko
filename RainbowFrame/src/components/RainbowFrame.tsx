import React from "react";
import { LinkedListQueue } from "@shared/data_structures/queue";
import { shallowEqual } from "shallow-equal";

type FramePropsType = {
  colors: string[];
  children: React.ReactNode;
};

type FrameStateType = {
  colors: string[];
};

export default class RainbowFrame extends React.Component<
  FramePropsType,
  FrameStateType
> {
  private queue: LinkedListQueue = new LinkedListQueue();
  private interval: NodeJS.Timeout | null = null;
  constructor(props: FramePropsType) {
    super(props);
    this.props.colors.forEach((item) => this.queue.enqueue(item));
  }
  state = {
    colors: this.queue.list,
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      const firstItem = this.queue.dequeue() as string;
      this.queue.enqueue(firstItem);
      this.setState({
        colors: this.queue.list,
      });
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval!);
  }

  componentDidUpdate(prevState: Readonly<FrameStateType>) {
    if (shallowEqual(prevState, this.state)) {
      this.setState({
        colors: this.state.colors,
      });
    }
  }

  getFrame = () =>
    this.state.colors.reduce(
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
