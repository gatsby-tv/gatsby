import { useState, useEffect, ReactElement } from 'react';
import { NextComponentType, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { Frame, Icon } from '@gatsby-tv/components';
import { Channel } from '@gatsby-tv/layout';
import { Spinner } from '@gatsby-tv/icons';

import { Link } from '@src/components/Link';
import { useSession } from '@src/services/session';
import { useChannelModalState } from '@src/utilities/channel-modal';

import { PreAlpha } from './components/PreAlpha';
import { Topbar } from './components/Topbar';

import styles from './App.module.scss';

export interface AppProps<T> {
  page: NextComponentType<NextPageContext, any, T>;
  $props: T;
}

export function App<T>(props: AppProps<T>): ReactElement {
  const { page: Page, $props } = props;
  const router = useRouter();
  const { session } = useSession();
  const { active, channel, setChannel } = useChannelModalState();
  const [spinner, setSpinner] = useState(false);
  const loading = !session.valid && session.loading;
  const isTransient = /^\/\$/.test(router.pathname);

  useEffect(() => void setChannel(undefined), [Page]);

  useEffect(() => {
    if (!loading) return void setSpinner(false);

    const id = setTimeout(() => setSpinner(true), 500);
    return () => clearTimeout(id);
  }, [loading]);

  const SpinnerMarkup = spinner ? (
    <Icon className={styles.Spinner} src={Spinner} />
  ) : null;

  const LoadingMarkup = <div className={styles.Loading}>{SpinnerMarkup}</div>;

  const TopbarMarkup = !isTransient ? (
    <Topbar className={styles.Topbar} />
  ) : undefined;

  const ContentMarkup = !loading ? (
    <Frame topbar={TopbarMarkup}>
      <PreAlpha />
      <Channel.Modal
        active={active}
        channel={channel}
        link={Link.Channel}
        onExit={() => setChannel(undefined)}
      />
      <Page {...$props} />
    </Frame>
  ) : null;

  return ContentMarkup ?? LoadingMarkup;
}
