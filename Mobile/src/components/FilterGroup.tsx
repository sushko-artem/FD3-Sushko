import { Button } from "@shared/ui/button";
import React from "react";
import { emitter } from "@shared/events/emitter";

export default class FilterGroup extends React.PureComponent {
  state = {
    isActive: "all",
  };

  handleClick = (e: React.MouseEvent<HTMLElement>) => {
    emitter.emit("filter", e.currentTarget.id);
    this.setState({
      isActive: e.currentTarget.id,
    });
  };

  render(): React.ReactNode {
    return (
      <div className="mt-4 mb-1">
        <Button
          id="all"
          onClick={this.handleClick}
          className={`${
            this.state.isActive === "all"
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
            this.state.isActive === "active"
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
            this.state.isActive === "blocked"
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
