import React, { useEffect } from 'react';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { PostAuthPersistSignInKeyResponse } from '@gatsby-tv/types';

import { Page } from '@src/components/Page';
import { SignUp } from '@src/components/SignUp';
import { useSession } from '@src/utilities/session';
import { fetcher } from '@src/utilities/fetcher';

export default function SignUpPage(): React.ReactElement {
  const router = useRouter();
  const { key } = router.query as Record<string, string | undefined>;
  const [{ valid }] = useSession();

  useEffect(() => {
    router.prefetch('/');
  }, []);

  useEffect(() => {
    if (valid) router.push('/');
  }, [valid]);

  useEffect(() => {
    if (!key) return;

    fetcher<PostAuthPersistSignInKeyResponse>(
      `/auth/signin/${key}/persist`,
      undefined,
      { method: 'POST' }
    );
  }, [key]);

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
