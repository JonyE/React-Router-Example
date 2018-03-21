import React from "react";
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import DynamicComponent from "./DynamicComponent";

const BaseLayout = props => {
  const { data } = props;
  const tabsData = [...data].sort(
    (a, b) => parseInt(a.order) - parseInt(b.order)
  );
  return (
    <div>
      <header>
        <p>React Router v4 lazy load</p>
        <nav>
          <ul>
            {tabsData.map((data, i) => (
              <li key={`li-${data.id}`}>
                <NavLink
                  activeStyle={{ fontWeight: "bold", color: "blue" }}
                  key={`nav-${data.id}`}
                  to={`/${data.id}`}
                >
                  {data.title}
                </NavLink>
              </li>
            ))}
          </ul>
          <Switch>
            <Route
              exact
              path={`/`}
              render={props => (
                <DynamicComp {...props} from={`./${tabsData[0].path}`} />
              )}
            />
            {tabsData.map((data, i) => (
              <Route
                key={data.id}
                path={`/${data.id}`}
                render={props => (
                  <DynamicComp {...props} from={`./${data.path}`} />
                )}
              />
            ))}

            <Route component={NotFound} />
          </Switch>
        </nav>
      </header>
      <footer>Here can be yours ad!</footer>
    </div>
  );
};
BaseLayout.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      order: PropTypes.number.isRequired,
      path: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

const DynamicComp = props => {
  const { from } = props;
  return <DynamicComponent path={from} loader={() => <h1>Loading ...</h1>} />;
};
DynamicComp.propTypes = {
  from: PropTypes.string.isRequired
};

const NotFound = () => <div>404</div>;

export default props => (
  <BrowserRouter>
    <BaseLayout {...props} />
  </BrowserRouter>
);
