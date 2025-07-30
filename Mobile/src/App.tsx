import React from "react";
import Mobile from "@components/Mobile";
import type { IClients } from "@shared/interfaces/cilents-interface";
import { DATA } from "@shared/constants/data";
import { emitter } from "@shared/events/emitter";
import { nanoid } from "nanoid";

type AppStateType = {
  data: IClients;
  filter: "all" | "blocked" | "active";
  editedClientId: string | null;
};

export default class App extends React.PureComponent {
  state: AppStateType = {
    data: { ...(DATA as IClients) },
    filter: "all",
    editedClientId: null,
  };

  componentDidMount(): void {
    emitter.on("delete", this.delete);
    emitter.on("filter", this.filter);
    emitter.on("edit", this.edit);
    emitter.on("add", this.add);
  }

  componentWillUnmount(): void {
    emitter.off("delete", this.delete);
    emitter.off("filter", this.filter);
    emitter.off("edit", this.edit);
    emitter.off("add", this.add);
  }

  filter = (filter: "all" | "blocked" | "active") => {
    this.setState({ filter });
  };

  edit = (payload: string | IClients["clients"][number]) => {
    if (typeof payload === "object") {
      const clients = [
        ...this.state.data.clients.map((item) =>
          item.id === payload.id ? payload : item
        ),
      ];
      this.setState({
        data: { clients },
        editedClientId: null,
      });
    } else {
      this.setState({
        editedClientId: payload,
      });
    }
  };

  add = () => {
    const client = {
      id: nanoid(),
      lastName: "",
      firstName: "",
      secondName: "",
      balance: 0,
    };
    const clients = [...this.state.data.clients, { ...client }];
    this.setState({
      data: { clients },
    });
  };

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
        <Mobile
          filter={this.state.filter}
          editedClientId={this.state.editedClientId}
          data={this.state.data}
        />
      </div>
    );
  }
}
