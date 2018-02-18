import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Loadable from 'react-loadable';
import Loading from './Loading';

// const LoadableComponent = Loadable({
//   loader: () => import('./Hello'),
//   loading: Loading,
// })
const LoadableExample = Loadable.Map({
  loader: {
    TabContainer: () => (import('./TabContainer')),
    tabs: () => fetch(
      "https://yqx9r63l1x.codesandbox.io/public/tabs.json", { mode: 'cors' })
      .then(res => res.text())
      .then(data => console.log(data))
  },
  render(loaded, props) {
    let TabContainer = loaded.TabContainer.default;
    let tabs = loaded.tabs;
    return <TabContainer {...props} tabs={tabs} />;
  },
  loading: Loading
});

const TabContainer = ({ tabs }) => {
  return null;
}



export default class LoadableDashboard extends React.Component {
  render() {
    return <LoadableExample />;
  }
}


const Home = () => <div>Home</div>;



