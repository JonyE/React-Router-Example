import React from "react";
import PropTypes from "prop-types";

export default class DynamicComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { module: null };
  }

  componentDidMount() {
    const { path } = this.props;
    import(`${path}`).then(module => this.setState({ module: module.default }));
  }

  render() {
    const { module: Component } = this.state;
    const { loader: Loader } = this.props;
    return <div>{Component ? <Component {...this.props} /> : <Loader />}</div>;
  }
}
DynamicComponent.propTypes = {
  path: PropTypes.string.isRequired,
  loader: PropTypes.element.isRequired
};
