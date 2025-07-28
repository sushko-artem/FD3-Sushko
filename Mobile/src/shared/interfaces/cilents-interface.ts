type ClientType = {
  id: string;
  lastName: string;
  firstName: string;
  secondName: string;
  balance: number;
};

export interface IClients {
  clients: ClientType[];
}
