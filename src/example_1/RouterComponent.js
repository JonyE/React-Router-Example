import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom'
import DynamicComponent from './DynamicComponent';

const BaseLayout = (props) => {
    let {data: tabsData} = props;
    tabsData = tabsData.concat().sort((a, b) => (parseInt(a.order) - parseInt(b.order)));
    return (
        <div>
          <header>
          <p>React Router v4 lazy load</p>
          <nav>
            <ul>
                {tabsData.map((data, i) => (
                    <li key={i}>
                        <NavLink
                            activeStyle={{fontWeight: 'bold',color: 'blue'}}
                            key={i}
                            to={`/${data.id}`} >{data.title}
                        </NavLink>
                    </li>))}
            </ul>
            <Switch>
                <Route exact path={`/`} render = { (props) => (<DynamicComp {...props} from={`./${tabsData[0].path}`}/>)}/>
                {tabsData.map((data, i) => (
                    <Route
                        key = {i}
                        path={`/${data.id}`}
                        render={ (props) => (<DynamicComp {...props} from={`./${data.path}`}/>) }
                    />
                ))}

                <Route component={NotFound}/>
            </Switch>
          </nav>
          </header>
            <footer>
                Here can be yours ad!
            </footer>
        </div>
    );
};

const DynamicComp = (props) => {
    const{from} = props;
    return (<DynamicComponent
        path = {from}
        loader = {() => (<h1>Loading ...</h1>)}/>)
};

const NotFound = () => <div>404</div>

export default (props) => (
  <BrowserRouter>
    <BaseLayout {...props}/>
  </BrowserRouter>
)
