import React, { FC } from "react";
import { NextComponentType } from "next";
import { AppProps } from "next/app";

import { Provider } from "react-redux";
import { store, persistor } from "redux/store";
import { PersistGate } from "redux-persist/integration/react";

import "public/scss/main.scss";

type LayoutComponent = NextComponentType & {
  Layout: React.ComponentClass<{}, any>;
};

const Noop = ({ children }) => children;

const WrappedApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const Layout = (Component as LayoutComponent).Layout || Noop;

  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </PersistGate>
  );
};

export default WrappedApp;
