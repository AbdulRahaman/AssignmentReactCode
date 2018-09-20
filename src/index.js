import React, { Component } from "react";
import { render } from "react-dom";
import { ListComponent } from "./components/listComponent";

// used to count the users reacord (helped to stop loading users if count is more than totalrecords count configured

export class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <ListComponent />;
  }
}

render(<Main />, document.getElementById("root"));
