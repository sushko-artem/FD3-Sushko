import React, { Component } from "react";

type FilterPropsType = {
  list: string[];
};

type FilterStateType = {
  currentList: string[];
  currentInputValue: string;
  isSorted: boolean;
};

export default class Filter extends Component<
  FilterPropsType,
  FilterStateType
> {
  list = this.props.list;

  state = {
    currentList: this.list,
    currentInputValue: "",
    isSorted: false,
  };

  private filter = (list: string[], stringValue: string) => {
    return list.filter((item) => item.includes(stringValue));
  };

  private filterSortHandler = (
    isSorted: boolean,
    currentInputValue: string
  ) => {
    this.setState((prevState) => {
      let currentList = this.list;
      if (isSorted) {
        if (currentInputValue) {
          currentList = this.filter(currentList, currentInputValue).toSorted();
        } else {
          currentList = currentList.toSorted();
        }
      } else {
        if (!currentInputValue) {
          currentList = currentList;
        } else {
          currentList = this.filter(currentList, currentInputValue);
        }
      }
      return { currentList, currentInputValue, isSorted };
    });
  };

  handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.filterSortHandler(this.state.isSorted, e.target.value);
  };

  handleCheckbox = () => {
    this.filterSortHandler(!this.state.isSorted, this.state.currentInputValue);
  };

  handleReset = () => {
    if (!this.state.isSorted && !this.state.currentInputValue) return;
    this.setState({
      currentList: this.list,
      currentInputValue: "",
      isSorted: false,
    });
  };

  changeView = () => {};

  render(): React.ReactNode {
    const { currentList, isSorted, currentInputValue } = this.state;
    return (
      <div className="m-auto">
        <div className="flex justify-around">
          <input
            onChange={this.handleCheckbox}
            checked={isSorted}
            className="w-4 accent-slate-400"
            type="checkbox"
            name="sorting"
            id="sorting"
          />
          <input
            onChange={this.handleInput}
            value={currentInputValue}
            className="border-2 rounded-sm outline-slate-400 ml-2"
            type="text"
          />
          <button
            onClick={this.handleReset}
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
            value={currentList.join("\n")}
          ></textarea>
        </div>
      </div>
    );
  }
}
