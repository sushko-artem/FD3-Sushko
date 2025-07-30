import React from "react";
import { Table, TableBody, TableCaption } from "@shared/ui/table";
import Header from "ui/header";
import FilterGroup from "./FilterGroup";
import type { IClients } from "@shared/interfaces/cilents-interface";
import Client from "./Client";
import { emitter } from "@shared/events/emitter";
import memoize from "memoizee";

type MobileStateType = {
  filter: "all" | "blocked" | "active";
  editedClientId: string | null;
};

export default class Mobile extends React.PureComponent<
  IClients,
  MobileStateType
> {
  state: MobileStateType = {
    filter: "all",
    editedClientId: null,
  };

  componentDidMount(): void {
    emitter.on("filter", this.filter);
    emitter.on("edit", this.edit);
  }

  componentWillUnmount(): void {
    emitter.off("filter", this.filter);
    emitter.off("edit", this.edit);
  }

  filter = (filter: "all" | "blocked" | "active") => {
    this.setState({ filter });
  };

  edit = (id: string) => {
    this.setState({
      editedClientId: id,
    });
  };

  getFilteredClients = memoize(
    (clients: IClients["clients"], filter: "all" | "blocked" | "active") => {
      switch (filter) {
        case "active":
          return clients.filter((item) => item.balance >= 0);
        case "blocked":
          return clients.filter((item) => item.balance < 0);
        default:
          return clients;
      }
    }
  );

  render(): React.ReactNode {
    console.log("render Mobile");
    const filteredClients = this.getFilteredClients(
      this.props.clients,
      this.state.filter
    );
    return (
      <>
        <FilterGroup filter={this.state.filter} />
        <Table className="md:table-fixed">
          <TableCaption>A list of Mobile clients.</TableCaption>
          <Header />
          <TableBody>
            {filteredClients.map((item) => (
              <Client
                isEdit={this.state.editedClientId === item.id}
                key={item.id}
                info={item}
              />
            ))}
          </TableBody>
        </Table>
      </>
    );
  }
}
