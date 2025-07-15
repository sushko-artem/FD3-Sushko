import React, { Component } from "react";
import ModalConfirm from "@components/ModalConfirm";
import type { IShopProps } from "@interfaces/shop.props";
import Head from "@components/Head";
import Product from "@components/Product";
import ProductCard from "./ProductCard";
import EditForm from "./EditForm";

type ProductsType = IShopProps["products"][number];
type ShopStateType = {
  products: ProductsType[];
  product: ProductsType | null;
  activeElement: string | null;
  removedElement: string | null;
  isModalOpen: boolean;
  isEditFormOpen: boolean;
};

const modalText = "Do You really want to remove this item?";

export default class Shop extends Component<IShopProps, ShopStateType> {
  state: ShopStateType = {
    products: this.props.products,
    product: null,
    activeElement: null,
    removedElement: null,
    isModalOpen: false,
    isEditFormOpen: false,
  };

  private deleteItem() {
    this.setState((prevState) => ({
      products: prevState.products.filter(
        (product) => product.id !== prevState.removedElement
      ),
      isModalOpen: !prevState.isModalOpen,
      removedElement: null,
      activeElement:
        prevState.activeElement === prevState.removedElement
          ? null
          : prevState.activeElement,
      isEditFormOpen:
        prevState.activeElement === prevState.removedElement ? false : true,
    }));
  }

  setIsEdit = () => {};

  setIsActive = (id: string, isEditFormOpen: boolean) => {
    const { productName, price, photoURL, count } = this.state.products.find(
      (item) => item.id === id
    ) as ProductsType;
    const productData = {
      id,
      productName,
      price,
      photoURL,
      count,
    };
    this.setState({
      activeElement: id,
      product: { ...productData },
      isEditFormOpen,
    });
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
    const { isModalOpen, activeElement, product, isEditFormOpen } = this.state;
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
        {activeElement && !isEditFormOpen && <ProductCard {...product!} />}
        {isEditFormOpen && <EditForm {...product!}></EditForm>}
      </>
    );
  }
}
