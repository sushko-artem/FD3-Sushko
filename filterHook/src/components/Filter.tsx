import { useMemo, useState } from "react";
import { Controls } from "./Controls";
import { List } from "./List";

type FilterPropsType = {
  list: string[];
};

export const Filter = ({ list }: FilterPropsType) => {
  // const [currentList, setCurrentList] = useState(list);
  const [isSorted, setIsSorted] = useState(false);
  const [currentInputValue, setCurrentInputValue] = useState("");

  const filterSortHandler = (action: boolean | string | "reset") => {
    if (typeof action === "boolean") {
      setIsSorted(action);
    } else if (action === "reset") {
      setCurrentInputValue("");
      setIsSorted(false);
    } else setCurrentInputValue(action);
  };

  const getList = useMemo(() => {
    let currentList = [...list];
    if (currentInputValue) {
      currentList = currentList.filter((item) =>
        item.includes(currentInputValue)
      );
    }
    if (isSorted) {
      currentList.sort();
    }
    return currentList;
  }, [list, currentInputValue, isSorted]);

  // useEffect(() => {
  //   let currentList = [...list];
  //   if (currentInputValue) {
  //     currentList = currentList.filter((item) =>
  //       item.includes(currentInputValue)
  //     );
  //   }
  //   if (isSorted) {
  //     currentList.sort();
  //   }
  //   setCurrentList(currentList);
  // }, [list, currentInputValue, isSorted]);

  return (
    <div className="m-auto">
      <Controls
        filterSortHandler={filterSortHandler}
        isSorted={isSorted}
        value={currentInputValue}
      />
      <List list={getList} />
    </div>
  );
};
