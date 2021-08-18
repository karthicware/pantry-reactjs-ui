import React, { useContext } from "react";
import Router from "next/router";
import PropTypes from "prop-types";

import { AppContext } from "AppContext.js";

const PrivateRoute = ({ component, ...rest }) => {
  const context = React.useContext(AppContext);
  const { isAuthenticated } = context;
  if (isAuthenticated === null) {
    return <></>;
  } else if (!isAuthenticated) {
    //return <Redirect href="/login" />;
    Router.push("/login");
  }
  //return <Route {...rest} component={component} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired
};

export default PrivateRoute;
