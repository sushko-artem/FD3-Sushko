import React, { createRef } from "react";
import type { IClients } from "@shared/interfaces/cilents-interface";
import { Button } from "@shared/ui/button";
import { TableCell, TableRow } from "@shared/ui/table";
import { emitter } from "@shared/events/emitter";

type ClientPropsType = {
  info: IClients["clients"][number];
  isEdit: boolean;
};
export default class Client extends React.PureComponent<ClientPropsType> {
  lastNameRef = createRef<HTMLInputElement>();
  firstNameRef = createRef<HTMLInputElement>();
  secondNameRef = createRef<HTMLInputElement>();
  balanceRef = createRef<HTMLInputElement>();

  delete = () => {
    emitter.emit("delete", this.props.info.id);
  };

  edit = () => {
    if (!this.props.isEdit) {
      emitter.emit("edit", this.props.info.id);
    } else {
      const editedClient = {
        id: this.props.info.id,
        lastName: this.lastNameRef.current?.value,
        firstName: this.firstNameRef.current?.value,
        secondName: this.secondNameRef.current?.value,
        balance: this.balanceRef.current?.value,
      };
      emitter.emit("edit", editedClient);
    }
  };

  render(): React.ReactNode {
    const { lastName, firstName, secondName, balance } = this.props.info;
    const status = balance < 0;
    const isEdit = this.props.isEdit;
    console.log(`render ${lastName}`);
    return (
      <TableRow>
        {isEdit ? (
          <>
            <TableCell>
              <input
                ref={this.lastNameRef}
                className="border-1 rounded-sm p-1 w-full"
                type="text"
                defaultValue={lastName}
              />
            </TableCell>
            <TableCell>
              <input
                ref={this.firstNameRef}
                className="border-1 rounded-sm p-1 w-full"
                type="text"
                defaultValue={firstName}
              />
            </TableCell>
            <TableCell>
              <input
                ref={this.secondNameRef}
                className="border-1 rounded-sm p-1 w-full"
                type="text"
                defaultValue={secondName}
              />
            </TableCell>
            <TableCell>
              <input
                ref={this.balanceRef}
                className="border-1 rounded-sm p-1 w-full"
                type="number"
                defaultValue={balance}
              />
            </TableCell>
          </>
        ) : (
          <>
            <TableCell>{lastName}</TableCell>
            <TableCell>{firstName}</TableCell>
            <TableCell>{secondName}</TableCell>
            <TableCell>{balance}</TableCell>
          </>
        )}
        <TableCell
          className={`${status ? "bg-red-500" : "bg-green-400 "} min-w-[80px]`}
        >
          {status ? "Blocked" : "Active"}
        </TableCell>
        <TableCell>
          <Button
            className={`hover:bg-gray-300 active:bg-gray-400 cursor-pointer transition-all ${
              isEdit ? "text-green-600 border-1 border-emerald-500" : null
            }`}
            variant="secondary"
            onClick={this.edit}
          >
            {isEdit ? "Save" : "Edit"}
          </Button>
        </TableCell>
        <TableCell>
          <Button
            className="hover:bg-gray-300 active:bg-gray-400 cursor-pointer transition-all"
            variant="secondary"
            onClick={this.delete}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}
