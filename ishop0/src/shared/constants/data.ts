import { generateID } from "@helpers/generateID";

const DATA = {
  title: {
    name: "GUM",
    address: "Red Square, 3, Moscow",
  },
  products: [
    {
      productName: "Capital K.Marx",
      price: 999.99,
      photoURL: "/images/capital.png",
      count: 1,
    },
    {
      productName: "Bear",
      price: 101.05,
      photoURL: "/images/bear.png",
      count: 211,
    },
    {
      productName: "Headphones",
      price: 794.55,
      photoURL: "/images/headphones.png",
      count: 26,
    },
    {
      productName: "Watering Can",
      price: 289.95,
      photoURL: "/images/watering-can.png",
      count: 5866,
    },
    {
      productName: "Smartwatch",
      price: 559.95,
      photoURL: "/images/smartwatch.png",
      count: 82,
    },
  ],
};

generateID(DATA.products);

export { DATA };
