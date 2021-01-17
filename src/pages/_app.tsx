import React from "react";
import { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import { SWRConfig } from "swr";
import { useIPFSNode, IPFSContext } from "@gatsby-tv/utilities";
import { AppProvider } from "@gatsby-tv/components";
import "@gatsby-tv/components/static/fonts.css";

import { PreAlpha } from "@src/components/PreAlpha";
import { AppLayout } from "@src/components/AppLayout";
import { fetcher } from "@src/utilities/fetcher";

export default function App({
  Component,
  pageProps,
}: AppProps): React.ReactElement {
  const node = useIPFSNode("/ipfs.js");

  return (
    <AppProvider theme="dark">
      <Provider session={pageProps.session}>
        <SWRConfig value={{ fetcher }}>
          <IPFSContext.Provider value={node}>
            <PreAlpha />
            <AppLayout page={Component} $props={pageProps} />
          </IPFSContext.Provider>
        </SWRConfig>
      </Provider>
    </AppProvider>
  );
}
