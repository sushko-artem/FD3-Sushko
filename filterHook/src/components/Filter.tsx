import { useMemo, useState } from "react";
import { Controls } from "./Controls";
import { List } from "./List";

type FilterPropsType = {
  list: string[];
};

export const Filter = ({ list }: FilterPropsType) => {
  const [isSorted, setIsSorted] = useState(false);
  const [currentInputValue, setCurrentInputValue] = useState("");

  const filterHandler = (value: string) => {
    setCurrentInputValue(value);
  };

  const sortHandler = (value: boolean) => {
    setIsSorted(value);
  };

  const reset = () => {
    setCurrentInputValue("");
    setIsSorted(false);
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

  return (
    <div className="m-auto">
      <Controls
        reset={reset}
        sortHandler={sortHandler}
        filterHandler={filterHandler}
        isSorted={isSorted}
        value={currentInputValue}
      />
      <List list={getList} />
    </div>
  );
};
