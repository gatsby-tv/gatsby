import { ReactElement } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { AppProvider } from '@gatsby-tv/components';
import { useIPFSContext, IPFSContext } from '@gatsby-tv/utilities';
import '@gatsby-tv/components/dist/styles.css';
import '@gatsby-tv/components/dist/fonts.css';
import '@gatsby-tv/player/dist/styles.css';
import '@gatsby-tv/preview/dist/styles.css';
import '@gatsby-tv/layout/dist/styles.css';
import 'react-image-crop/dist/ReactCrop.css';

import { App } from '@src/layout/App';
import { fetcher } from '@src/utilities/fetcher';
import { useSessionContext, SessionContext } from '@src/services/session';
import {
  useChannelModalContext,
  ChannelModalContext,
} from '@src/utilities/channel-modal';

export default function AppPage({
  Component,
  pageProps,
}: AppProps): ReactElement {
  const channelContext = useChannelModalContext();
  const sessionContext = useSessionContext();
  const nodeContext = useIPFSContext(
    process.env.NEXT_PUBLIC_BOOTSTRAP_NODES?.split(',').filter(Boolean)
  );

  const HeaderMarkup = (
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="preconnect" href={process.env.NEXT_PUBLIC_WESTEGG_URL} />
      <meta name="theme-color" content="#1f1f1f" />
    </Head>
  );

  return (
    <AppProvider deps={[Component]}>
      <SWRConfig
        value={{
          fetcher: (url, ...args) =>
            fetcher(url, ...args, {}).then((resp) => resp.json()),
        }}
      >
        <IPFSContext.Provider value={nodeContext}>
          <ChannelModalContext.Provider value={channelContext}>
            <SessionContext.Provider value={sessionContext}>
              {HeaderMarkup}
              <App page={Component} $props={pageProps} />
            </SessionContext.Provider>
          </ChannelModalContext.Provider>
        </IPFSContext.Provider>
      </SWRConfig>
    </AppProvider>
  );
}
