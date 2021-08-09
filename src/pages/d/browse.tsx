import { ReactElement } from 'react';

import { Page } from '@src/components/Page';
import { Browse } from '@src/components/Directory';

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
