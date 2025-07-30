import React from "react";
import { Table, TableBody, TableCaption } from "@shared/ui/table";
import Header from "ui/header";
import FilterGroup from "./FilterGroup";
import type { IClients } from "@shared/interfaces/cilents-interface";
import Client from "./Client";
import memoize from "memoizee";
import { Button } from "@shared/ui/button";
import { emitter } from "@shared/events/emitter";

type MobilePropsType = {
  data: IClients;
  filter: "all" | "blocked" | "active";
  editedClientId: string | null;
};
export default class Mobile extends React.PureComponent<MobilePropsType> {
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

  add = () => {
    emitter.emit("add");
  };

  render(): React.ReactNode {
    console.log("render Mobile");
    const filteredClients = this.getFilteredClients(
      this.props.data.clients,
      this.props.filter
    );
    return (
      <>
        <FilterGroup filter={this.props.filter} />
        <Table className="md:table-fixed">
          <TableCaption>A list of Mobile clients.</TableCaption>
          <Header />
          <TableBody>
            {filteredClients.map((item) => (
              <Client
                isEdit={this.props.editedClientId === item.id}
                key={item.id}
                info={item}
              />
            ))}
          </TableBody>
        </Table>
        <Button
          className="mt-4 cursor-pointer bg-gray-200 hover:bg-gray-300 text-black font-bold active:bg-gray-400 transition-all"
          onClick={this.add}
        >
          Add client
        </Button>
      </>
    );
  }
}
