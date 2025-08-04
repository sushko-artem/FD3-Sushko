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
  // const [clients, setClients] = useState<ClientsType>([])
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredClients = useMemo(() => {
    const currentClients = [...clients];
    switch (filter) {
      case "active":
        return currentClients.filter((item) => item.balance >= 0);
      case "blocked":
        return currentClients.filter((item) => item.balance < 0);
      default:
        return currentClients;
    }
  }, [clients, filter]);

  {
    /*
  ---> Так Mobile рендерится по 2 раза. Сначала с пустым clients 
  (useState<ClientsType>([])), а потом с новым стейтом clients. Если бы 
  получали данные с backend, использовали бы useEffect.

  useEffect(() => {
    const clients = [...(DATA.clients as ClientsType)];
    switch (filter) {
      case "active":
        setClients(clients.filter((item) => item.balance >= 0));
        break;
      case "blocked":
        setClients(clients.filter((item) => item.balance < 0));
        break;
      default:
        setClients(clients);
    }
  }, [filter]);
*/
  }

  const handleFilter = (filter: "all" | "blocked" | "active") => {
    // React использует механизм "bailout" (прекращение обновлений) и перестает
    // рендерить компонент после первого повторного нажатия. Из-за этого только
    // при первом повторном нажатии на уже обработанное событие происходит
    // рендер Mobile. Все последующие - игнорируются. Иначе, не понятно откуда
    // этот лишний рендер и как избавиться от него.
    setFilter(filter);
  };

  const handleEdit = (payload: ClientsType[number] | string) => {
    if (typeof payload === "object") {
      const currentClients = [
        ...clients.map((item) => (item.id === payload.id ? payload : item)),
      ];
      setClients(currentClients);
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
    const currentClients = [...clients, { ...newClient }];
    setClients(currentClients);
  };

  const handleDelete = (id: string) => {
    const currentClients = [...clients.filter((item) => item.id !== id)];
    setClients(currentClients);
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
