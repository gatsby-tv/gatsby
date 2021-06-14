import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Injection, Icon, TextDisplay } from '@gatsby-tv/components';
import { classNames } from '@gatsby-tv/utilities';
import { Spinner } from '@gatsby-tv/icons';
import { GetAuthSignInKeyResponse } from '@gatsby-tv/types';

import { Link } from '@src/components/Link';
import { fetcher } from '@src/utilities/fetcher';
import { useSession } from '@src/utilities/session';
import styles from '@src/styles/MagicLink.module.scss';

export default function MagicLinkPage(): React.ReactElement {
  const router = useRouter();
  const { key = '', exists = '' } = router.query;
  const [session, setSession] = useSession();

  useEffect(() => {
    router.prefetch('/$signup');
  }, []);

  useEffect(() => {
    if (key && !+exists) {
      router.push({
        pathname: '/$signup',
        query: { key },
      });
    } else if (key) {
      fetcher<GetAuthSignInKeyResponse>(`/auth/signin/${key}`).then((resp) =>
        setSession(resp.token)
      );
    }
  }, [key, exists]);

  useEffect(() => {
    if (session.valid) router.push('/');
  }, [session.valid]);

  const HeaderMarkup = (
    <Head>
      <title>Signing in to Gatsby...</title>
    </Head>
  );

  return (
    <>
      {HeaderMarkup}
      <Injection target="$foreground">
        <div className={styles.Container}>
          <Icon className={styles.Spinner} src={Spinner} />
        </div>
      </Injection>
    </>
  );
}
