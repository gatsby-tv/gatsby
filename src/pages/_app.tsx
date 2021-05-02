import React, { useState, useEffect } from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import { SWRConfig } from "swr";
import { AppProvider } from "@gatsby-tv/components";
import { useIPFSNode, IPFSContext } from "@gatsby-tv/utilities";
import { Channel } from "@gatsby-tv/types";
import "@gatsby-tv/components/dist/styles.css";
import "@gatsby-tv/components/dist/fonts.css";
import "@gatsby-tv/player/dist/styles.css";
import "@gatsby-tv/preview/dist/styles.css";
import "@gatsby-tv/content/dist/styles.css";
import "react-image-crop/dist/ReactCrop.css";

import { AppLayout } from "@src/components/AppLayout";
import { fetcher } from "@src/utilities/fetcher";
import { ChannelModalContext } from "@src/utilities/channel-modal";

export default function App({
  Component,
  pageProps,
}: AppProps): React.ReactElement {
  const bootstrap = process.env.NEXT_PUBLIC_IPFS_BOOTSTRAP_NODES?.split(",");
  const [channel, setChannel] = useState<Channel | undefined>(undefined);
  const node = useIPFSNode(bootstrap);

  useEffect(() => setChannel(undefined), [Component]);

  const HeaderMarkup = (
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="preconnect" href={process.env.NEXT_PUBLIC_WESTEGG_URL} />
    </Head>
  );

  return (
    <AppProvider>
      <Provider session={pageProps.session}>
        <SWRConfig value={{ fetcher }}>
          <IPFSContext.Provider value={node}>
            <ChannelModalContext.Provider value={[channel, setChannel]}>
              {HeaderMarkup}
              <AppLayout page={Component} $props={pageProps} />
            </ChannelModalContext.Provider>
          </IPFSContext.Provider>
        </SWRConfig>
      </Provider>
    </AppProvider>
  );
}
