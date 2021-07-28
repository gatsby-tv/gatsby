import React from 'react';

import { Page } from '@src/components/Page';
import { About } from '@src/components/Info';

export default function AboutPage(): React.ReactElement {
  return (
    <Page title="Gatsby - About" margin={false}>
      <About.Landing />
      <About.Layout>
        <About.Heading />
        <About.Ipfs />
        <About.Markup />
      </About.Layout>
    </Page>
  );
}
