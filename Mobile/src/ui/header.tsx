import { TableHead, TableHeader, TableRow } from "@shared/ui/table";
import React from "react";

const tableHeader = [
  "Last name",
  "First name",
  "Second name",
  "Balance",
  "Status",
  "Edit info.",
  "Delete client",
];

export default class Header extends React.PureComponent {
  render(): React.ReactNode {
    return (
      <TableHeader>
        <TableRow>
          {tableHeader.map((item, index) => (
            <TableHead className="text-center" key={index}>
              {item}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
    );
  }
}
