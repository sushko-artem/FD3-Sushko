type ControlsPropsType = {
  isSorted: boolean;
  value: string;
  filterHandler: (value: string) => void;
  sortHandler: (value: boolean) => void;
  reset: () => void;
};

export const Controls = ({
  isSorted,
  value,
  filterHandler,
  sortHandler,
  reset,
}: ControlsPropsType) => {
  const handleSort = (e: React.ChangeEvent<HTMLInputElement>) => {
    sortHandler(e.target.checked);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterHandler(e.target.value);
  };

  const handleReset = () => {
    reset();
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
