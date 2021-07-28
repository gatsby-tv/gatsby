import React from 'react';

import { Page } from '@src/components/Page';
import { Browse } from '@src/components/Directory';

export default function BrowsePage(): React.ReactElement {
  return (
    <Page title="Browse">
      <Browse.Layout>
        <Browse.Heading />
        <Browse.Content />
      </Browse.Layout>
    </Page>
  );
}
