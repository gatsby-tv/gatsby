import { ReactElement } from 'react';
import { useRouter } from 'next/router';

import { Page } from '@src/layout/Page';
import { Settings } from '@src/layout/User';
import { useSession } from '@src/services/session';

export default function UserSettings(): ReactElement {
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
