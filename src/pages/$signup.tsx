import { useEffect, ReactElement } from 'react';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { PostAuthPersistSignInKeyResponse } from '@gatsby-tv/types';

import { Page } from '@src/components/Page';
import { SignUp } from '@src/components/SignUp';
import { useSession } from '@src/services/session';
import { fetcher } from '@src/utilities/fetcher';

export default function SignUpPage(): ReactElement {
  const router = useRouter();
  const { key } = router.query as Record<string, string | undefined>;
  const { session } = useSession();

  useEffect(() => {
    router.prefetch('/');
  }, []);

  useEffect(() => {
    if (session.valid) router.push('/');
  }, [session.valid]);

  useEffect(() => {
    if (!key || session.valid) return;

    fetcher<PostAuthPersistSignInKeyResponse>(`/auth/signin/${key}/persist`, {
      method: 'POST',
    });
  }, [key, session.valid]);

  if (!key) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Page title="Sign Up to Gatsby">
      <SignUp.Layout>
        <SignUp.Heading />
        <SignUp.Fields code={key} />
      </SignUp.Layout>
    </Page>
  );
}
