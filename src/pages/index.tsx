import { ReactElement } from 'react';

import { Page } from '@src/layout/Page';
import { Home } from '@src/layout/Home';
import { useSession } from '@src/services/session';

export default function IndexPage(): ReactElement {
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
