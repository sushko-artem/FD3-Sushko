import { useEffect, useMemo } from "react";
import { Table, TableBody, TableCaption } from "@shared/ui/table";
import { Header } from "ui/header";
import { FilterGroup } from "@features/Filter/FilterGroup";
import { Client } from "@features/Client/Client";
import { Button } from "@shared/ui/button";
import { emitter } from "@shared/events/emitter";
import { dataLoad } from "@features/Mobile/thunkMiddleware/fetch-data";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  addClient,
  deleteClient,
  editClient,
  setClientId,
  setFilter,
} from "./mobile.slice";
import type { RootState } from "@redux/store";
import type { ClientType } from "@shared/api/api";

export const Mobile = () => {
  console.log("render Mobile");
  const dispatch = useAppDispatch();
  const { companyName, clientsArr, filter, dataLoadStatus, error, clientId } =
    useAppSelector((state: RootState) => state.clients);

  useEffect(() => {
    if (dataLoadStatus === "idle") {
      dispatch(dataLoad());
    }
    emitter.on("filter", handleFilter);
    emitter.on("delete", handleDelete);
    emitter.on("edit", handleEdit);
    return () => {
      emitter.removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, dataLoadStatus]);

  const filteredClients = useMemo(() => {
    switch (filter) {
      case "active":
        return clientsArr.filter((item) => item.balance >= 0);
      case "blocked":
        return clientsArr.filter((item) => item.balance < 0);
      default:
        return clientsArr;
    }
  }, [clientsArr, filter]);

  const handleFilter = (filter: "all" | "blocked" | "active") => {
    dispatch(setFilter(filter));
  };

  const handleEdit = (payload: ClientType | number) => {
    if (typeof payload === "object") {
      dispatch(editClient(payload));
      dispatch(setClientId(null));
    } else {
      dispatch(setClientId(payload));
    }
  };

  const handleAdd = () => {
    let lastId = Math.max(...clientsArr.map((item) => item.id));
    const newClient = {
      id: (lastId += 5),
      fam: "",
      im: "",
      otch: "",
      balance: 0,
    };
    dispatch(addClient(newClient));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteClient(id));
  };

  if (dataLoadStatus === "pending") return <div>Loaging...</div>;
  if (dataLoadStatus === "failed") return <div>Error: {error}</div>;

  return (
    <>
      <FilterGroup filter={filter} />
      <Table className="md:table-fixed">
        <TableCaption>Список клиентов компании {companyName}</TableCaption>
        <Header />
        <TableBody>
          {filteredClients.map((item) => (
            <Client isEdit={clientId === item.id} key={item.id} info={item} />
          ))}
        </TableBody>
      </Table>
      <Button
        onClick={handleAdd}
        className="mt-4 cursor-pointer bg-gray-200 hover:bg-gray-300 text-black font-bold active:bg-gray-400 transition-all"
      >
        Add client
      </Button>
    </>
  );
};
