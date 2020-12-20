import React, { Component, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Aux from "../../hoc/_Aux";
import * as actionTypes from "../../store/actions/actionTypes";
import routes from "../../routes";
import config from "../../config";
import cookie from "js-cookie";
import Loader from "../../components/Loader";
import "./app.scss";
const Home = React.lazy(() => import("../../containers/Home"));
const Menu = React.lazy(() => import("../../containers/Menu"));

const Layout = (props) => {
  if (props.location.pathname) {
    let pathname = props.location.pathname;
    console.log(
      "condition for pathname",
      !pathname.includes("login"),
      pathname
    );
    console.log("condition for username", cookie.get("username"));
    console.log(
      "condition for login route",
      !pathname.includes("login") && !cookie.get("username")
    );
    if (
      !pathname.includes("login") &&
      !pathname.includes("menu") &&
      !pathname.includes("overview") &&
      !cookie.get("userId")
    ) {
      window.location.assign(`http://${window.location.host}/login${pathname}`);
    }
  }

  const menu = () => {
    const RoutesArr = routes.map((route, index) => {
      const { path, exact, name } = route;
      return route.component ? (
        <Route
          key={index}
          path={`${path}`}
          exact={exact}
          name={name}
          render={(props) => {
            return <route.component {...props} />;
          }}
        />
      ) : null;
    });
    return RoutesArr;
  };
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
};

export default Layout;
