import { useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { useUniqueId } from '@gatsby-tv/utilities';

import { Page } from '@src/components/Page';
import { Subscriptions } from '@src/components/Directory';
import { useSession } from '@src/utilities/session';

export default function SubscriptionsPage(): ReactElement {
  const { session } = useSession();
  const router = useRouter();
  const label = useUniqueId('heading');

  useEffect(() => {
    if (!session.user) router.push('/');
  }, [session.user]);

  return (
    <Page title="Subscriptions">
      <Subscriptions.Layout>
        <Subscriptions.Heading id={label} />
        <Subscriptions.Content label={label} user={session.user} />
      </Subscriptions.Layout>
    </Page>
  );
}
