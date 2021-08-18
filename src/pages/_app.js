import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";

import PageChange from "components/PageChange/PageChange.js";

import "assets/scss/material-kit-pro-react.scss?v=1.8.0";
import "assets/css/override.css";

import 'react-block-ui/style.css';

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import { ACCESS_TOKEN, MOBILE } from "utils/constants";
import { AppContext } from "AppContext.js";

Router.events.on("routeChangeStart", url => {
  console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

export default class MyApp extends App {
  constructor() {
    super();
    //console.log(`MyApp...`);
    this.initAxiosConfig();
    this.state = {
      cartItems: 0,
      cartAmount: 0,
      isAuthenticated: null,
      mobile: null,
      isOpenLoginModal: false
    };
  }

  initAxiosConfig() {
    // console.log(`initAxiosConfig`);
    // console.log(`process.env.API_BASE_URL=${process.env.API_BASE_URL}`);
    axios.defaults.baseURL = process.env.API_BASE_URL;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

    // Add a request interceptor
    axios.interceptors.request.use(
      config => {
        //console.log("axios.interceptors.request.use");
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
          config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
      },
      error => {
        console.log("axios.interceptors.request.error = error");
        Promise.reject(error);
      }
    );
    //response config
    const errorHandler = (error, status) => {
      //console.log("axios.interceptors.request.status = status");
      if (error.response) {
        if (error.response.status === 401) {
          this.logout();
        }
      }
      return Promise.reject({ ...error });
    };

    const successHandler = response => {
      return response;
    };
    axios.interceptors.response.use(
      response => successHandler(response),
      error => errorHandler(error)
    );
  }

  componentDidMount() {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token && localStorage.getItem(MOBILE)) {
      this.setState({
        isAuthenticated: true,
        mobile: localStorage.getItem(MOBILE)
      });
      this.loadCartData();
    }
  }

  loadCartData = () => {
    axios
      .get(`api/v1/cart/count`)
      .then(resp => {
        this.setState({ cartItems: resp.data.result.cartCountApi.cartItemCount, cartAmount: resp.data.result.cartCountApi.totalAmount });
        //console.log(`${JSON.stringify(this.state)}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  triggerLoginModal = () => {
    this.setState({
      isOpenLoginModal: true,
    });
  };

  login = (accessToken, mobile, isRedirect) => {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(MOBILE, mobile);
    this.setState({
      isAuthenticated: true,
      mobile
    });
    this.loadCartData();
    if(isRedirect)
      Router.push({ pathname: "/" });
  };

  logout = () => {
    localStorage.clear();
    this.setState({
      isAuthenticated: false,
      mobile: null,
      cartItems: null,
      cartAmount: 0,
    });
    Router.push({
      pathname: "/"
    });
  };

  getAuthentication = () => {
    return this.state.isAuthenticated;
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>Pantry</title>
        </Head>
        <AppContext.Provider
          value={{
            refreshCartCount: () => this.loadCartData(),
            triggerLoginModal: () => this.triggerLoginModal(),
            isOpenLoginModal: this.state.isOpenLoginModal,
            resetTriggerLoginModal: () => this.setState({isOpenLoginModal: false}),
            login: (accessToken, mobile, isRedirect) => this.login(accessToken, mobile, isRedirect),
            logout: () => this.logout(),
            isAuthenticated: this.state.isAuthenticated,
            mobile: this.state.mobile,
            cartItems: this.state.cartItems,
            cartAmount: this.state.cartAmount,
          }}
        >
          <Component {...pageProps} />
        </AppContext.Provider>
      </React.Fragment>
    );
  }
}
