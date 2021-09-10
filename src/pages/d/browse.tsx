import { ReactElement } from 'react';

import { Page } from '@src/layout/Page';
import { Browse } from '@src/layout/Browse';

export default function BrowsePage(): ReactElement {
  return (
    <Page title="Browse">
      <Browse.Layout>
        <Browse.Heading />
        <Browse.Content />
      </Browse.Layout>
    </Page>
  );
}
