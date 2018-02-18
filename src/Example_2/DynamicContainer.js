import React from "react";

class Dynamic extends React.Component {
  constructor(props) {
    super(props);
    this.state = { component: null };
  }
  componentWillMount() {
    this.props
      .load()
      .then((module) => this.setState(() => ({ component: module.default })));
  }
  render() {
    return this.props.children(this.state.component);
  }
}

const DynamicContainer = props => {
  const { path, loader:Loader } = props;
  return (
    <Dynamic load={() => import(`${path}`)}>
      {Component => {
        console.log(Component);
          return Component === null ? (
              <Loader/>
          ) : (
              <Component {...props} />
          )
      }

      }
    </Dynamic>
  );
};
export default DynamicContainer;
