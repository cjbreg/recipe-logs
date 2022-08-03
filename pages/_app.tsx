import "../src/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store, wrapper, persistor } from "../src/store/store";
import { PersistGate } from "redux-persist/integration/react";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="application-name" content="Recipe Logs" />
        <meta name="apple-mobile-web-app-title" content="Recipe Logs" />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="/icons/icon-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/icon-152x152.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="shortcut icon" href="/favicon.ico" />

        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#1BBD66" />

        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta
          name="description"
          content="Simple app for collecting online recipies"
        />

        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
