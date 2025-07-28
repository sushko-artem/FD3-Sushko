import Mobile from "@components/Mobile";
import React from "react";
import type { IClients } from "@shared/interfaces/cilents-interface";
import { DATA } from "@shared/constants/data";

export default class App extends React.PureComponent {
  render() {
    return (
      <div className="container mx-auto px-3 sm:px-4 lg:px-5">
        <Mobile {...(DATA as IClients)} />
      </div>
    );
  }
}
