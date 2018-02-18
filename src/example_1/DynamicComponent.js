import React from 'react';

export default class DynamicComponent extends React.Component {
  constructor() {
    super();
    this.state = { module: null };
  }

  componentDidMount() {
    const { path } = this.props;
    import(`${path}`)
      .then(module => this.setState({ module: module.default }))
  }

  render() {
    const { module: Component } = this.state;
    const { loader: Loader } = this.props;
    return (
      <div>
        {Component ? <Component {...this.props}/> : <Loader/>}
      </div>
    )
  }
}