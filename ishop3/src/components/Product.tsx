import React, { Component } from "react";
import type { IShopProps } from "@interfaces/shop.props";
import { currencyEUR } from "@helpers/euro-currency";
import edit from "@assets/edit.png";
import cross from "@assets/cross.webp";

type ProductType = IShopProps["products"][number];

type AdditionalType = {
  handleRequestConfirm: (id: string) => void;
  setIsActive: (id: string, isEdit: boolean) => void;
  isActive: string | null;
};

type ProductPropsType = ProductType & AdditionalType;

export default class Product extends Component<ProductPropsType> {
  setIsActive = () => {
    this.props.setIsActive(this.props.id, false);
  };

  setIsEdit = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    this.props.setIsActive(this.props.id, true);
  };

  handleRequestConfirm = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    this.props.handleRequestConfirm(target.dataset.id!);
  };
  render(): React.ReactNode {
    const { isActive, photoURL, productName, count, price, id } = this.props;
    return (
      <section
        onClick={this.setIsActive}
        className={`${
          isActive === id
            ? "bg-blue-600 scale-105 shadow-lg shadow-slate-700 transition-all"
            : null
        } relative justify-around xs:flex w-[95%] sm:w-[90%] md:w-[90%] lg:w-[70%] xs:h-28 border-2 border-cyan-300 rounded-lg m-auto cursor-pointer transition-all`}
      >
        <div
          onClick={this.handleRequestConfirm}
          className="w-4 h-4 absolute top-2 right-2 hover:scale-125 transition-all"
        >
          <img
            data-id={id}
            src={cross}
            alt="close"
            title="remove this item"
            width={100}
          />
        </div>
        <div
          onClick={this.setIsEdit}
          className="w-4 h-4 absolute right-2 bottom-2 hover:scale-125 transition-all"
        >
          <img
            className="bg-inherit"
            src={edit}
            title="edit product"
            alt="edit"
            width={100}
          />
        </div>
        <div className="flex xs:flex-col align-middle justify-center">
          <img src={photoURL} alt={productName} width={100} />
        </div>
        <div className="flex xs:flex-col justify-center">
          <span className="font-serif mr-1">description:</span>
          <span className="text-gray-200 font-bold">{productName}</span>
        </div>
        <div className="flex xs:flex-col justify-center text-center">
          <span className="font-serif mr-1">available:</span>
          <span className="text-gray-200 font-bold">{count}</span>
        </div>
        <div className="flex xs:flex-col justify-center">
          <span className="text-yellow-300 font-bold text-base">
            {currencyEUR(price)}
          </span>
        </div>
      </section>
    );
  }
}
