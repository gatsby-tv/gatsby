import { useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { GetAuthSignInKeyResponse } from '@gatsby-tv/types';

import { Page } from '@src/layout/Page';
import { fetcher } from '@src/utilities/fetcher';
import { useSession } from '@src/services/session';

export default function MagicLinkPage(): ReactElement {
  const router = useRouter();
  const { key = '', exists = '' } = router.query;
  const { session, setSession } = useSession();

  useEffect(() => {
    router.prefetch('/$signup');
  }, []);

  useEffect(() => {
    if (!key || session.valid) return;

    if (exists === 'true') {
      fetcher<GetAuthSignInKeyResponse>(`/auth/signin/${key}`)
        .then((resp) => resp.json())
        .then((resp) => setSession(resp.token));
    } else {
      router.push({
        pathname: '/$signup',
        query: { key },
      });
    }
  }, [key, exists, session.valid]);

  useEffect(() => {
    if (session.valid) router.push('/');
  }, [session.valid]);

  return (
    <Page title="Signing in to Gatsby">
      <Page.Loading />
    </Page>
  );
}
