import { Button } from "./Button";

type DoubleButtonPropsType = {
  caption1: string;
  caption2: string;
  children: string;
  cbPressed: <T>(value: T) => void;
};

export const DoubleButton = ({
  caption1,
  caption2,
  children,
  cbPressed,
}: DoubleButtonPropsType) => (
  <div className="m-2">
    <Button value={caption1} onClick={() => cbPressed(1)} />
    <span className="p-1">{children}</span>
    <Button value={caption2} onClick={() => cbPressed(2)} />
  </div>
);
