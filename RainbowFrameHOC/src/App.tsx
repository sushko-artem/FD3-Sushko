import { DoubleButton } from "@components/DoubleButton";
import withRainbowFrame from "HOC/rainbowFrame";

const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "#00BFFF",
  "blue",
  "purple",
];
const FramedDoubleButton = withRainbowFrame(colors)(DoubleButton);

export const App = () => (
  <div className="container max-w-[550px] mx-auto px-3 sm:px-4 lg:px-5">
    <FramedDoubleButton
      caption1="однажды"
      caption2="пору"
      cbPressed={(num) => alert(num)}
    >
      в студёную зимнюю
    </FramedDoubleButton>
  </div>
);
