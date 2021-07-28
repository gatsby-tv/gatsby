import React from 'react';
import { useRouter } from 'next/router';

import { Page } from '@src/components/Page';
import { Settings } from '@src/components/User';
import { useSession } from '@src/utilities/session';

export default function UserSettings(): React.ReactElement {
  const router = useRouter();
  const [{ user, token, valid }] = useSession();

  if (!token) {
    router.push('/');
    return <Page title="Settings" />;
  }

  if (!user || !valid) {
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
          <Settings.Avatar user={user} token={token} />
          <Settings.Info user={user} />
        </Settings.Header>
        <Settings.Fields user={user} token={token} />
      </Settings.Layout>
    </Page>
  );
}
