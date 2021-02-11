import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import { SWRConfig } from "swr";
import { useIPFSNode, IPFSContext } from "@gatsby-tv/utilities";
import { AppProvider } from "@gatsby-tv/components";

import { AppLayout } from "@src/components/AppLayout";
import { fetcher } from "@src/utilities/fetcher";

export default function App({
  Component,
  pageProps,
}: AppProps): React.ReactElement {
  const node = useIPFSNode();

  const HeaderMarkup = (
    <Head>
      <link rel="stylesheet" type="text/css" href="/fonts.css" />
      <link rel="preconnect" href="http://localhost:6001" />
      <link
        rel="preload"
        href="/fonts/Inter.var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    </Head>
  );

  return (
    <AppProvider theme="dark">
      <Provider session={pageProps.session}>
        <SWRConfig value={{ fetcher }}>
          <IPFSContext.Provider value={node}>
            {HeaderMarkup}
            <AppLayout page={Component} $props={pageProps} />
          </IPFSContext.Provider>
        </SWRConfig>
      </Provider>
    </AppProvider>
  );
}
