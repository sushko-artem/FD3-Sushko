type ButtonPropsType = {
  value: string;
  onClick: () => void;
};

export const Button = (props: ButtonPropsType) => (
  <input
    className="border-1 border-amber-800 rounded-md p-1 hover:cursor-pointer bg-amber-100 hover:bg-amber-200 active:bg-amber-100 transition-all"
    type="button"
    {...props}
  />
);
