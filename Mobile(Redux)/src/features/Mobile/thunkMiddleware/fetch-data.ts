import type { AppDispatch } from "@redux/store";
import { loadData, setDataLoadStatus } from "../mobile.slice";
import { api } from "@shared/api/api";

export const dataLoad = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setDataLoadStatus({ status: "pending", error: null }));
    const data = await api.getData();
    dispatch(setDataLoadStatus({ status: "success", error: null }));
    dispatch(loadData(data));
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error!";
    dispatch(
      setDataLoadStatus({ status: "failed", error: `Error: ${errorMessage}` })
    );
  }
};
