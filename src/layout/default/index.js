import React, { Component, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Aux from '../../hoc/_Aux';
import * as actionTypes from '../../store/actions/actionTypes';
import routes from '../../routes';
import config from '../../config';
import Loader from '../../components/Loader';
import "./app.scss";
const Home = React.lazy(() => import('../../containers/Home'));
const Menu = React.lazy(() => import('../../containers/Menu'));




const Layout = props => {

  const menu =  () => {
    const RoutesArr = routes.map((route, index) => {
    const {path,exact,name} = route;
    return route.component ? (
      <Route
        key={index}
        path={`${path}`}
        exact={exact}
        name={name}
        render={(props) =>{
        return(<route.component {...props} />);
      }}
      />
    ) : null;
  })
  return RoutesArr;
}  
  return (
    <Aux>
    <div>
      <Suspense fallback={<Loader />}>
        <Switch>
          {menu()}
         {/* <Redirect from='/' to={config.defaultPath} /> */}
        </Switch>
      </Suspense>
    </div>
  </Aux>
  );
}



export default Layout;


