import React, { useState, useEffect } from 'react';
import { NextComponentType, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { Frame, Icon } from '@gatsby-tv/components';
import { useModalClear } from '@gatsby-tv/utilities';
import { Channel } from '@gatsby-tv/content';
import { Spinner } from '@gatsby-tv/icons';

import { PreAlpha } from '@src/components/PreAlpha';
import { Topbar } from '@src/components/Topbar';
import { Link } from '@src/components/Link';
import { useSession } from '@src/utilities/session';
import { useChannelModal } from '@src/utilities/channel-modal';

import styles from './App.module.scss';

export interface AppProps<T> {
  page: NextComponentType<NextPageContext, any, T>;
  $props: T;
}

export function App<T>(props: AppProps<T>): React.ReactElement {
  const { page: Page, $props } = props;
  const router = useRouter();
  const clear = useModalClear();
  const { session } = useSession();
  const [channel, setChannel] = useChannelModal();
  const [spinner, setSpinner] = useState(false);
  const loading = !session.valid && session.loading;
  const isTransient = /^\/\$/.test(router.pathname);

  useEffect(clear, [Page]);

  useEffect(() => {
    if (loading) {
      const id = setTimeout(() => setSpinner(true), 500);
      return () => clearTimeout(id);
    }
  }, [loading]);

  return loading ? (
    <div className={styles.Loading}>
      {spinner && <Icon className={styles.Spinner} src={Spinner} />}
    </div>
  ) : (
    <Frame
      topbar={!isTransient ? <Topbar className={styles.Topbar} /> : undefined}
    >
      <PreAlpha />
      <Channel.Modal
        channel={channel}
        active={Boolean(channel)}
        link={Link.Channel}
        onExit={() => setChannel(undefined)}
      />
      <Page {...$props} />
    </Frame>
  );
}
