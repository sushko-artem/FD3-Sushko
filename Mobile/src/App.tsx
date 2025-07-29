import React from "react";
import Mobile from "@components/Mobile";
import type { IClients } from "@shared/interfaces/cilents-interface";
import { DATA } from "@shared/constants/data";
import { emitter } from "@shared/events/emitter";

export default class App extends React.PureComponent {
  state = {
    data: { ...(DATA as IClients) },
  };

  componentDidMount(): void {
    emitter.on("delete", this.delete);
  }

  componentWillUnmount(): void {
    emitter.off("delete", this.delete);
  }

  delete = (id: string) => {
    const clients = [
      ...this.state.data.clients.filter((item) => item.id !== id),
    ];
    this.setState({
      data: { clients },
    });
  };

  render() {
    console.log("render APP");
    return (
      <div className="container mx-auto px-3 sm:px-4 lg:px-5">
        <Mobile {...this.state.data} />
      </div>
    );
  }
}
