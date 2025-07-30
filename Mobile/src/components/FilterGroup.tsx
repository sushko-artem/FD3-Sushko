import React from "react";
import { Button } from "@shared/ui/button";
import { emitter } from "@shared/events/emitter";

type FilterGroupPropsType = {
  filter: "all" | "blocked" | "active";
};

export default class FilterGroup extends React.PureComponent<FilterGroupPropsType> {
  handleClick = (e: React.MouseEvent<HTMLElement>) => {
    emitter.emit("filter", e.currentTarget.id);
  };

  render(): React.ReactNode {
    console.log("render FilterGroup");
    return (
      <div className="mt-4 mb-1">
        <Button
          id="all"
          onClick={this.handleClick}
          className={`${
            this.props.filter === "all"
              ? "bg-red-500 text-white hover:bg-red-500 hover:text-white"
              : null
          } mr-1 mb-1 cursor-pointer transition-all`}
          variant="outline"
        >
          All
        </Button>
        <Button
          id="active"
          onClick={this.handleClick}
          className={`${
            this.props.filter === "active"
              ? "bg-red-500 text-white hover:bg-red-500 hover:text-white"
              : null
          } mr-1 mb-1 cursor-pointer transition-all`}
          variant="outline"
        >
          Active
        </Button>
        <Button
          id="blocked"
          onClick={this.handleClick}
          className={`${
            this.props.filter === "blocked"
              ? "bg-red-500 text-white hover:bg-red-500 hover:text-white"
              : null
          } mr-1 mb-1 cursor-pointer transition-all`}
          variant="outline"
        >
          Blocked
        </Button>
      </div>
    );
  }
}
