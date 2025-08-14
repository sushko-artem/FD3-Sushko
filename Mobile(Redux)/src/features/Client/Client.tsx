import { memo, useRef } from "react";
import { Button } from "@shared/ui/button";
import { TableCell, TableRow } from "@shared/ui/table";
import { emitter } from "@shared/events/emitter";
import type { ClientType } from "@shared/api/api";

type ClientPropsType = {
  info: ClientType;
  isEdit: boolean;
};

export const Client = memo(({ info, isEdit }: ClientPropsType) => {
  const { fam: lastName, im: firstName, otch: secondName, balance, id } = info;
  console.log(`render ${lastName}`);
  const status = balance < 0;
  const lastNameRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const secondNameRef = useRef<HTMLInputElement>(null);
  const balanceRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    if (!isEdit) {
      emitter.emit("edit", id);
    } else {
      const editedClient = {
        id,
        fam: lastNameRef.current?.value,
        im: firstNameRef.current?.value,
        otch: secondNameRef.current?.value,
        balance: balanceRef.current?.value,
      };
      emitter.emit("edit", editedClient);
    }
  };

  const handleDelete = () => {
    emitter.emit("delete", id);
  };

  return (
    <TableRow>
      {isEdit ? (
        <>
          <TableCell>
            <input
              ref={lastNameRef}
              className="border-1 rounded-sm p-1 w-full"
              type="text"
              defaultValue={lastName}
            />
          </TableCell>
          <TableCell>
            <input
              ref={firstNameRef}
              className="border-1 rounded-sm p-1 w-full"
              type="text"
              defaultValue={firstName}
            />
          </TableCell>
          <TableCell>
            <input
              ref={secondNameRef}
              className="border-1 rounded-sm p-1 w-full"
              type="text"
              defaultValue={secondName}
            />
          </TableCell>
          <TableCell>
            <input
              ref={balanceRef}
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
          onClick={handleEdit}
        >
          {isEdit ? "Save" : "Edit"}
        </Button>
      </TableCell>
      <TableCell>
        <Button
          className="hover:bg-gray-300 active:bg-gray-400 cursor-pointer transition-all"
          variant="secondary"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
});
