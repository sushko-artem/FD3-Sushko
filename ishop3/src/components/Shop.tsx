import React, { Component } from "react";
import ModalConfirm from "@components/ModalConfirm";
import type { IShopProps } from "@interfaces/shop.props";
import Head from "@components/Head";
import Product from "@components/Product";
import ProductCard from "./ProductCard";
import Form from "./Form";
import { Button } from "@shared/ui/button";
import { editInputEvent } from "@shared/events/eventEmitters";
import { nanoid } from "nanoid";

type ProductsType = IShopProps["products"][number];
type ShopStateType = {
  products: ProductsType[];
  product: ProductsType | null;
  activeElement: string | null;
  removedElement: string | null;
  isModalOpen: boolean;
  isEditFormOpen: boolean;
  isEdit: boolean;
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
    isEdit: false,
  };

  componentDidUpdate(
    _prevProps: Readonly<IShopProps>,
    prevState: Readonly<ShopStateType>
  ): void {
    if (
      prevState.isEdit !== this.state.isEdit &&
      prevState.isEditFormOpen !== this.state.isEditFormOpen
    ) {
      this.setState({ isEdit: false, isEditFormOpen: false });
    }
    if (
      prevState.isEdit !== this.state.isEdit &&
      prevState.product !== this.state.product
    ) {
      this.setState({ isEdit: true, isEditFormOpen: true });
    }
  }

  componentDidMount(): void {
    editInputEvent.on("startEdit", this.startEdit);
  }

  componentWillUnmount(): void {
    editInputEvent.off("startEdit", this.startEdit);
  }

  startEdit = () => {
    this.setState({ isEdit: true });
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
      isEditFormOpen: false,
      product:
        prevState.activeElement === prevState.removedElement
          ? null
          : prevState.product,
    }));
  }

  setIsEdit = (id: string, isEditFormOpen: boolean) => {
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

  setIsEditFormOpen = () => {
    this.setState({
      isEditFormOpen: false,
      activeElement: null,
      isEdit: false,
    });
  };

  saveChanges = (data: ProductsType) => {
    this.setState((prevState) => {
      let products;
      if (!prevState.products.find((item) => item.id === data.id)) {
        products = prevState.products.push(data);
      }
      products = prevState.products.map((item) =>
        item.id === data.id ? (item = data) : item
      );
      return {
        products,
        isEditFormOpen: !prevState.isEditFormOpen,
        activeElement: null,
        isEdit: false,
      };
    });
  };

  addProduct = () => {
    const id = nanoid();
    const product: ProductsType = {
      id,
      productName: "" as string,
      price: 0 as number,
      count: 0 as number,
      photoURL: "" as string,
    };
    this.setState({
      activeElement: null,
      isEdit: true,
      product,
    });
  };

  render(): React.ReactNode {
    const { isModalOpen, activeElement, product, isEditFormOpen, isEdit } =
      this.state;
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
              isVisible={isEdit}
              isActive={activeElement}
              handleRequestConfirm={this.handleRequestConfirm}
              setIsEdit={this.setIsEdit}
              key={item.id}
              {...item}
            />
          ))}
        </main>
        <Button
          onClick={this.addProduct}
          className={`flex mt-6 justify-self-center ${
            isEditFormOpen
              ? "animate-disappearing opacity-0 pointer-events-none"
              : "bg-fuchsia-600 hover:bg-fuchsia-500 active:bg-fuchsia-600 cursor-pointer"
          }`}
        >
          Create Product
        </Button>
        <div className="mt-4 mb-4 min-h-[450px]">
          {activeElement && !isEditFormOpen && product && (
            <ProductCard {...product} />
          )}
          {isEditFormOpen && product && (
            <Form
              saveChanges={this.saveChanges}
              closeForm={this.setIsEditFormOpen}
              product={product}
            ></Form>
          )}
        </div>
      </>
    );
  }
}
