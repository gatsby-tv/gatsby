import React from 'react';
import { useRouter } from 'next/router';

import { Page } from '@src/components/Page';
import { Settings } from '@src/components/User';
import { useSession } from '@src/utilities/session';

export default function UserSettings(): React.ReactElement {
  const router = useRouter();
  const { session } = useSession();

  if (!session.token) {
    router.push('/');
    return <Page title="Settings" />;
  }

  if (!session.user || !session.valid) {
    return (
      <Page title="Settings">
        <Page.Loading />
      </Page>
    );
  }

  return (
    <Page title="Settings">
      <Settings.Layout>
        <Settings.Header>
          <Settings.Avatar user={session.user} token={session.token} />
          <Settings.Info user={session.user} />
        </Settings.Header>
        <Settings.Fields user={session.user} token={session.token} />
      </Settings.Layout>
    </Page>
  );
}
