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
};

export default class Mobile extends React.PureComponent<
  IClients,
  MobileStateType
> {
  state: MobileStateType = {
    filter: "all",
  };

  componentDidMount(): void {
    emitter.on("filter", this.filter);
  }

  componentWillUnmount(): void {
    emitter.off("filter", this.filter);
  }

  filter = (filter: "all" | "blocked" | "active") => {
    this.setState({ filter });
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
        <Table>
          <TableCaption>A list of Mobile clients.</TableCaption>
          <Header />
          <TableBody>
            {filteredClients.map((item) => (
              <Client key={item.id} info={item} />
            ))}
          </TableBody>
        </Table>
      </>
    );
  }
}
