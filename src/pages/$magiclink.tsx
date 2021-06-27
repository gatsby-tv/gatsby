import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Injection, Icon } from '@gatsby-tv/components';
import { Spinner } from '@gatsby-tv/icons';
import { GetAuthSignInKeyResponse } from '@gatsby-tv/types';

import { Page } from '@src/components/Page';
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
    if (!key) return;

    if (+exists) {
      fetcher<GetAuthSignInKeyResponse>(`/auth/signin/${key}`)
        .then((resp) => resp.json())
        .then((resp) => setSession((resp as { token: string }).token));
    } else {
      router.push({
        pathname: '/$signup',
        query: { key },
      });
    }
  }, [key, exists]);

  useEffect(() => {
    if (session.valid) router.push('/');
  }, [session.valid]);

  return (
    <Page title="Signing in to Gatsby">
      <Page.Loading />
    </Page>
  );
}
