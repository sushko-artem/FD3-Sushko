import React, { Component } from "react";
import ModalConfirm from "@components/ModalConfirm";
import { IShopProps } from "@interfaces/shop.props";
import Head from "@components/Head";
import Product from "@components/Product";

type ProductsType = IShopProps["products"][number] & { isActive: boolean };
type ShopStateType = {
  products: ProductsType[];
  isModalOpen: boolean;
  elementId: string | null;
};

const modalText = "Do You really want to remove this item?";

export default class Shop extends Component<IShopProps, ShopStateType> {
  state: ShopStateType = {
    products: this.props.products.map((product) => ({
      ...product,
      isActive: false,
    })),
    isModalOpen: false,
    elementId: null,
  };

  private deleteItem() {
    this.setState((prevState) => ({
      products: prevState.products.filter(
        (product) => product.id !== prevState.elementId
      ),
      isModalOpen: !prevState.isModalOpen,
      elementId: null,
    }));
  }

  setIsActive = (id: string) => {
    this.setState({
      products: this.state.products.map((product) => ({
        ...product,
        isActive: product.id === id,
      })),
    });
  };

  confirmAction = (res: boolean) => {
    res
      ? this.deleteItem()
      : this.setState((prevState) => ({
          isModalOpen: !prevState.isModalOpen,
        }));
  };

  handleRequestConfirm = (id: string) => {
    this.setState((prevState) => ({
      isModalOpen: !prevState.isModalOpen,
      elementId: id,
    }));
  };

  render(): React.ReactNode {
    const { isModalOpen } = this.state;
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
