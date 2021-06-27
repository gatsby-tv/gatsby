import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { AppProvider } from '@gatsby-tv/components';
import { useIPFSNode, IPFSContext } from '@gatsby-tv/utilities';
import { Channel } from '@gatsby-tv/types';
import '@gatsby-tv/components/dist/styles.css';
import '@gatsby-tv/components/dist/fonts.css';
import '@gatsby-tv/player/dist/styles.css';
import '@gatsby-tv/preview/dist/styles.css';
import '@gatsby-tv/content/dist/styles.css';
import 'react-image-crop/dist/ReactCrop.css';

import { AppLayout } from '@src/components/AppLayout';
import { fetcher } from '@src/utilities/fetcher';
import { useSessionContext, SessionContext } from '@src/utilities/session';
import { ChannelModalContext } from '@src/utilities/channel-modal';

export default function App({
  Component,
  pageProps,
}: AppProps): React.ReactElement {
  const [channel, setChannel] = useState<Channel | undefined>(undefined);
  const [session, setSession] = useSessionContext();
  const node = useIPFSNode(
    process.env.NEXT_PUBLIC_IPFS_BOOTSTRAP_NODES?.split(',').filter(Boolean)
  );

  useEffect(() => setChannel(undefined), [Component]);

  const HeaderMarkup = (
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="preconnect" href={process.env.NEXT_PUBLIC_WESTEGG_URL} />
    </Head>
  );

  return (
    <AppProvider>
      <SWRConfig
        value={{
          fetcher: (url, ...args) => fetcher(url, ...args).then((resp) => resp.json()),
        }}
      >
        <IPFSContext.Provider value={node}>
          <ChannelModalContext.Provider value={[channel, setChannel]}>
            <SessionContext.Provider value={[session, setSession]}>
              {HeaderMarkup}
              <AppLayout page={Component} $props={pageProps} />
            </SessionContext.Provider>
          </ChannelModalContext.Provider>
        </IPFSContext.Provider>
      </SWRConfig>
    </AppProvider>
  );
}
