import { generateID } from "@helpers/generateID";

const DATA = {
  clients: [
    {
      lastName: "Ivanov",
      firstName: "Ivan",
      secondName: "Ivanovich",
      balance: 123,
    },
    {
      lastName: "Petrov",
      firstName: "Petr",
      secondName: "Petrovich",
      balance: -78,
    },
    {
      lastName: "Sidorov",
      firstName: "Sidor",
      secondName: "Sidorovich",
      balance: 356,
    },
    {
      lastName: "Grigoriev",
      firstName: "Grigori",
      secondName: "Grigorievich",
      balance: -98,
    },
  ],
};

generateID(DATA.clients);

export { DATA };
