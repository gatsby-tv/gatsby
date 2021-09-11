import { ReactElement } from 'react';

import { Page } from '@src/layout/Page';
import { About } from '@src/layout/About';

export default function AboutPage(): ReactElement {
  return (
    <Page title="Gatsby - About" margin={false}>
      <About.Landing />
      <About.Layout>
        <About.Markup />
      </About.Layout>
    </Page>
  );
}
