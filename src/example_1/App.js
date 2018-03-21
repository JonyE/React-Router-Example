import React from "react";
import RouterComponent from "./RouterComponent";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentDidMount() {
    fetch(process.env.PUBLIC_URL + "tabs.json")
      .then(result => result.json())
      .then(data => {
        const { tabs } = data;
        this.setState({ data: tabs });
      });
  }

  render() {
    const { data } = this.state;
    return data ? <RouterComponent data={data} /> : <div>Loading</div>;
  }
}
