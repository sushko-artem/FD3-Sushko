import { Button } from "@shared/ui/button";
import { emitter } from "@shared/events/emitter";
import { memo } from "react";

type FilterGroupPropsType = {
  filter: "all" | "blocked" | "active";
};

export const FilterGroup = memo(({ filter }: FilterGroupPropsType) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    emitter.emit("filter", e.currentTarget.id);
  };

  return (
    <div className="mt-4 mb-1">
      <Button
        id="all"
        className={`${
          filter === "all"
            ? "bg-red-500 text-white hover:bg-red-500 hover:text-white"
            : null
        } mr-1 mb-1 cursor-pointer transition-all`}
        variant="outline"
        onClick={handleClick}
      >
        All
      </Button>
      <Button
        id="active"
        className={`${
          filter === "active"
            ? "bg-red-500 text-white hover:bg-red-500 hover:text-white"
            : null
        } mr-1 mb-1 cursor-pointer transition-all`}
        variant="outline"
        onClick={handleClick}
      >
        Active
      </Button>
      <Button
        id="blocked"
        className={`${
          filter === "blocked"
            ? "bg-red-500 text-white hover:bg-red-500 hover:text-white"
            : null
        } mr-1 mb-1 cursor-pointer transition-all`}
        variant="outline"
        onClick={handleClick}
      >
        Blocked
      </Button>
    </div>
  );
});
