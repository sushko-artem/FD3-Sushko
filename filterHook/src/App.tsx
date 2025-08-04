import { Filter } from "@components/Filter";

const list = [
  "california",
  "everything",
  "aboveboard",
  "washington",
  "basketball",
  "weathering",
  "characters",
  "literature",
  "contraband",
  "appreciate",
];

export const App = () => (
  <div className="container flex h-[100vh] mx-auto px-3 sm:px-4 lg:px-5">
    <Filter list={list} />
  </div>
);
