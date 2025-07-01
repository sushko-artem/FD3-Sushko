type Product = {
  id?: string;
  productName: string;
  price: number;
  photoURL: string;
  count: number;
};
export interface IShopProps {
  name: string;
  address: string;
  products: Product[];
}
