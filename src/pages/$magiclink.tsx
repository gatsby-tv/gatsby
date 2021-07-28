import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetAuthSignInKeyResponse } from '@gatsby-tv/types';

import { Page } from '@src/components/Page';
import { fetcher } from '@src/utilities/fetcher';
import { useSession } from '@src/utilities/session';

export default function MagicLinkPage(): React.ReactElement {
  const router = useRouter();
  const { key = '', exists = '' } = router.query;
  const [session, setSession] = useSession();

  useEffect(() => {
    router.prefetch('/$signup');
  }, [router]);

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
  }, [key, exists, router, setSession]);

  useEffect(() => {
    if (session.valid) router.push('/');
  }, [session.valid, router]);

  return (
    <Page title="Signing in to Gatsby">
      <Page.Loading />
    </Page>
  );
}
