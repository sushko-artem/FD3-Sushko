type ControlsPropsType = {
  isSorted: boolean;
  value: string;
  filterSortHandler: (action: boolean | string) => void;
};

export const Controls = ({
  isSorted,
  value,
  filterSortHandler,
}: ControlsPropsType) => {
  const handleSort = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterSortHandler(e.target.checked);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterSortHandler(e.target.value);
  };

  const handleReset = () => {
    filterSortHandler("reset");
  };

  return (
    <div className="flex justify-around">
      <input
        onChange={handleSort}
        className="w-4 accent-slate-400"
        type="checkbox"
        checked={isSorted}
      />
      <input
        className="border rounded-sm outline-slate-400 ml-2 px-1"
        type="text"
        value={value}
        onChange={handleFilter}
      />
      <button
        className="py-[0.5] px-2 border-2 rounded-md border-slate-300 ml-2 active:bg-slate-400 hover:bg-slate-200 transition-all"
        type="reset"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
};
