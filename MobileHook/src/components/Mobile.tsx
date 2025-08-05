import { useEffect, useMemo, useState } from "react";
import { Table, TableBody, TableCaption } from "@shared/ui/table";
import { Header } from "ui/header";
import { FilterGroup } from "./FilterGroup";
import type { IClients } from "@shared/interfaces/cilents-interface";
import { Client } from "./Client";
import { Button } from "@shared/ui/button";
import { emitter } from "@shared/events/emitter";
import { nanoid } from "nanoid";
import { DATA } from "@shared/constants/data";

type ClientsType = IClients["clients"];

export const Mobile = () => {
  console.log("render Mobile");
  const [clients, setClients] = useState<ClientsType>([
    ...(DATA.clients as ClientsType),
  ]);
  const [filter, setFilter] = useState<"all" | "blocked" | "active">("all");
  const [clientId, setClientId] = useState<string | null>(null);

  useEffect(() => {
    emitter.on("delete", handleDelete);
    emitter.on("filter", handleFilter);
    emitter.on("edit", handleEdit);
    return () => {
      emitter.off("delete", handleDelete);
      emitter.off("filter", handleFilter);
      emitter.off("edit", handleEdit);
    };
  }, []);

  const filteredClients = useMemo(() => {
    switch (filter) {
      case "active":
        return clients.filter((item) => item.balance >= 0);
      case "blocked":
        return clients.filter((item) => item.balance < 0);
      default:
        return clients;
    }
  }, [clients, filter]);

  const handleFilter = (filter: "all" | "blocked" | "active") => {
    setFilter(filter);
  };

  const handleEdit = (payload: ClientsType[number] | string) => {
    if (typeof payload === "object") {
      setClients((prevClients) =>
        prevClients.map((item) => (item.id === payload.id ? payload : item))
      );
      setClientId(null);
    } else setClientId(payload);
  };

  const handleAdd = () => {
    const newClient = {
      id: nanoid(),
      lastName: "",
      firstName: "",
      secondName: "",
      balance: 0,
    };
    setClients((prevClients) => [...prevClients, newClient]);
  };

  const handleDelete = (id: string) => {
    setClients((prevClients) => prevClients.filter((item) => item.id !== id));
  };

  return (
    <>
      <FilterGroup filter={filter} />
      <Table className="md:table-fixed">
        <TableCaption>A list of Mobile clients.</TableCaption>
        <Header />
        <TableBody>
          {filteredClients.map((item) => (
            <Client isEdit={clientId === item.id} key={item.id} info={item} />
          ))}
        </TableBody>
      </Table>
      <Button
        className="mt-4 cursor-pointer bg-gray-200 hover:bg-gray-300 text-black font-bold active:bg-gray-400 transition-all"
        onClick={handleAdd}
      >
        Add client
      </Button>
    </>
  );
};
