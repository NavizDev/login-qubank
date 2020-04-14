import React from "react";
import App from "next/app";
import "../public/styles.css";
import { ProvideAuth } from "../context/useAuthFirebase";

export default class LoginQubank extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ProvideAuth>
        <Component {...pageProps} />;
      </ProvideAuth>
    );
  }
}
