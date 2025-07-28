import { Table, TableBody, TableCaption } from "@shared/ui/table";
import React from "react";
import Header from "ui/header";
import FilterGroup from "./FilterGroup";
import type { IClients } from "@shared/interfaces/cilents-interface";
import Client from "./Client";
import { emitter } from "@shared/events/emitter";

export default class Mobile extends React.PureComponent<IClients> {
  state = {
    clients: this.props.clients,
  };

  componentDidMount(): void {
    emitter.on("filter", this.filter);
  }

  componentWillUnmount(): void {
    emitter.off("filter", this.filter);
  }

  filter = (id: string) => {
    if (id === "active") {
      const clients = this.props.clients.filter((i) => i.balance > 0);
      if (this.state.clients.some((item) => item.balance < 0)) {
        this.setState({
          clients,
        });
      }
    } else if (id === "blocked") {
      const clients = this.props.clients.filter((i) => i.balance < 0);
      if (this.state.clients.some((item) => item.balance > 0)) {
        this.setState({
          clients,
        });
      }
    } else {
      this.setState({
        clients: this.props.clients,
      });
    }
  };

  render(): React.ReactNode {
    console.log("render Mobile");
    return (
      <>
        <FilterGroup />
        <Table>
          <TableCaption>A list of Mobile clients.</TableCaption>
          <Header />
          <TableBody>
            {this.state.clients.map((item) => (
              <Client key={item.id} info={item} />
            ))}
          </TableBody>
        </Table>
      </>
    );
  }
}
