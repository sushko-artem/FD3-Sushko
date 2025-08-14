import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ClientType, CompanyDataType } from "@shared/api/api";

interface IMobileState {
  companyName: string;
  clientsArr: ClientType[];
  filter: "all" | "blocked" | "active";
  clientId: number | null;
  dataLoadStatus: "idle" | "pending" | "success" | "failed";
  error: string | null;
}

const initialState: IMobileState = {
  companyName: "",
  clientsArr: [],
  filter: "all",
  clientId: null,
  dataLoadStatus: "idle",
  error: null,
};

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    loadData: (state, action: PayloadAction<CompanyDataType>) => {
      state.companyName = action.payload.companyName;
      state.clientsArr = action.payload.clientsArr;
    },
    setDataLoadStatus: (
      state,
      action: PayloadAction<{
        status: IMobileState["dataLoadStatus"];
        error: IMobileState["error"];
      }>
    ) => {
      state.dataLoadStatus = action.payload.status;
      state.error = action.payload.error;
    },
    setFilter: (state, action: PayloadAction<IMobileState["filter"]>) => {
      state.filter = action.payload;
    },
    setClientId: (state, action: PayloadAction<IMobileState["clientId"]>) => {
      state.clientId = action.payload;
    },
    deleteClient: (state, action: PayloadAction<number>) => {
      state.clientsArr = state.clientsArr.filter(
        (item) => item.id !== action.payload
      );
    },
    editClient: (state, action: PayloadAction<ClientType>) => {
      const editedClient = action.payload;
      state.clientsArr = state.clientsArr.map((item) =>
        item.id === editedClient.id ? editedClient : item
      );
    },
    addClient: (state, action: PayloadAction<ClientType>) => {
      state.clientsArr.push(action.payload);
    },
  },
});

export const {
  loadData,
  setDataLoadStatus,
  setFilter,
  deleteClient,
  setClientId,
  editClient,
  addClient,
} = clientsSlice.actions;
export default clientsSlice.reducer;
