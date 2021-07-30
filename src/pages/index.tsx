import React from 'react';

import { Page } from '@src/components/Page';
import { Home } from '@src/components/Home';
import { useSession } from '@src/utilities/session';

export default function IndexPage(): React.ReactElement {
  const { session } = useSession();

  return (
    <Page title="Gatsby">
      <Home.Layout>
        <Home.Carousel />
        <Home.Recommended user={session.user} />
      </Home.Layout>
    </Page>
  );
}
