import type { IClients } from "@shared/interfaces/cilents-interface";
import { Button } from "@shared/ui/button";
import { TableCell, TableRow } from "@shared/ui/table";
import React from "react";

type ClientPropsType = {
  info: IClients["clients"][number];
};

export default class Client extends React.PureComponent<ClientPropsType> {
  render(): React.ReactNode {
    const { lastName, firstName, secondName, balance } = this.props.info;
    const status = balance < 0;
    console.log(`render ${lastName}`);
    return (
      <TableRow>
        <TableCell>{lastName}</TableCell>
        <TableCell>{firstName}</TableCell>
        <TableCell>{secondName}</TableCell>
        <TableCell>{balance}</TableCell>
        <TableCell
          className={`${status ? "bg-red-500" : "bg-green-400 "} min-w-[80px]`}
        >
          {status ? "Blocked" : "Active"}
        </TableCell>
        <TableCell>
          {
            <Button
              className="hover:bg-gray-300 active:bg-gray-400 cursor-pointer transition-all"
              variant="secondary"
            >
              Edit
            </Button>
          }
        </TableCell>
        <TableCell>
          {
            <Button
              className="hover:bg-gray-300 active:bg-gray-400 cursor-pointer transition-all"
              variant="secondary"
            >
              Delete
            </Button>
          }
        </TableCell>
      </TableRow>
    );
  }
}
