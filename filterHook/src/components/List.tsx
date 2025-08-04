import { memo } from "react";

type ListPropsType = {
  list: string[];
};

export const List = memo(({ list }: ListPropsType) => (
  <div className="mt-2">
    <textarea
      onChange={() => {}}
      className="bg-transparent font-bold border rounded-md p-2 text-center"
      rows={7}
      cols={30}
      value={list.join("\n")}
    ></textarea>
  </div>
));
