import React, { Component } from "react";

type FilterPropsType = {
  list: string[];
};

type FilterStateType = {
  curentlList: string[];
  currentInputValue: string;
  isSorted: boolean;
};

export default class Filter extends Component<
  FilterPropsType,
  FilterStateType
> {
  private list = this.props.list;

  state = {
    curentlList: this.list,
    currentInputValue: "",
    isSorted: false,
  };

  filterList = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      curentlList: this.list.filter((item) => item.includes(e.target.value)),
      currentInputValue: e.target.value,
    });
  };

  sortList = () => {
    this.setState((prevState) => ({
      isSorted: !prevState.isSorted,
    }));
  };

  reset = () => {
    this.setState({
      curentlList: this.list,
      currentInputValue: "",
      isSorted: false,
    });
  };

  changeView = () => {};

  render(): React.ReactNode {
    const { curentlList, isSorted, currentInputValue } = this.state;
    const sortedList = curentlList.toSorted();
    return (
      <div className="m-auto">
        <div className="flex justify-around">
          <input
            onChange={this.sortList}
            checked={isSorted}
            className="w-4 accent-slate-400"
            type="checkbox"
            name="sorting"
            id="sorting"
          />
          <input
            onChange={this.filterList}
            value={currentInputValue}
            className="border-2 rounded-sm outline-slate-400 ml-2"
            type="text"
          />
          <button
            onClick={this.reset}
            className="py-[0.5] px-2 border-2 rounded-md border-slate-300 ml-2 active:bg-slate-400 hover:bg-slate-200 transition-all"
            type="reset"
          >
            Reset
          </button>
        </div>
        <div className="mt-2">
          <textarea
            onChange={this.changeView}
            className="bg-transparent font-bold border rounded-md p-2 text-center"
            name="list"
            id="list"
            rows={7}
            cols={30}
            value={isSorted ? sortedList.join("\n") : curentlList.join("\n")}
          ></textarea>
        </div>
      </div>
    );
  }
}
