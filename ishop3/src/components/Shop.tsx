import React, { Component } from "react";
import ModalConfirm from "@components/ModalConfirm";
import type { IShopProps } from "@interfaces/shop.props";
import Head from "@components/Head";
import Product from "@components/Product";

type ProductsType = IShopProps["products"][number];
type ShopStateType = {
  products: ProductsType[];
  isModalOpen: boolean;
  activeElement: string | null;
  removedElement: string | null;
};

const modalText = "Do You really want to remove this item?";

export default class Shop extends Component<IShopProps, ShopStateType> {
  state: ShopStateType = {
    products: this.props.products,
    isModalOpen: false,
    activeElement: null,
    removedElement: null,
  };

  private deleteItem() {
    this.setState((prevState) => ({
      products: prevState.products.filter(
        (product) => product.id !== prevState.removedElement
      ),
      isModalOpen: !prevState.isModalOpen,
      removedElement: null,
    }));
  }

  setIsActive = (id: string) => {
    this.setState({ activeElement: id });
  };

  confirmAction = (res: boolean) => {
    if (res) {
      this.deleteItem();
    } else {
      this.setState((prevState) => ({
        isModalOpen: !prevState.isModalOpen,
      }));
    }
  };

  handleRequestConfirm = (id: string) => {
    this.setState((prevState) => ({
      isModalOpen: !prevState.isModalOpen,
      removedElement: id,
    }));
  };

  render(): React.ReactNode {
    const { isModalOpen, activeElement } = this.state;
    return (
      <>
        {isModalOpen && (
          <ModalConfirm
            modalText={modalText}
            confirmAction={this.confirmAction}
          />
        )}
        <Head name={this.props.name} address={this.props.address} />
        <main className="mt-4 grid gap-2">
          {this.state.products.map((item) => (
            <Product
              isActive={activeElement}
              handleRequestConfirm={this.handleRequestConfirm}
              setIsActive={this.setIsActive}
              key={item.id}
              {...item}
            />
          ))}
        </main>
      </>
    );
  }
}
