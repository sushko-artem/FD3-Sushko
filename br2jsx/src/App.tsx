import BR2JSX from "@components/BR2JSX";
import React from "react";

const text = "первый<br>второй<br/>третий<br />последний";

export default class App extends React.Component {
  render(): React.ReactNode {
    return <BR2JSX text={text} />;
  }
}
