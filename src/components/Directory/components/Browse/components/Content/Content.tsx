import React, { useState } from 'react';
import { Tabs, Rule } from '@gatsby-tv/components';
import { Listing } from '@gatsby-tv/content';
import { useUniqueId } from '@gatsby-tv/utilities';

import { Link } from '@src/components/Link';

import styles from './Content.module.scss';

export function Content(): React.ReactElement {
  const [tab, setTab] = useState('popular');
  const ids = {
    popular: useUniqueId('tab'),
    recent: useUniqueId('tab'),
    panel: useUniqueId('panel'),
  };

  const label = tab === 'popular' ? ids.popular : ids.recent;
  const Content = tab === 'popular' ? Listing.Recommended : Listing.New;

  return (
    <>
      <Tabs className={styles.Tabs} selection={tab} onSelect={setTab}>
        <Tabs.Item id={ids.popular} option="popular" aria-controls={ids.panel}>
          Popular
        </Tabs.Item>
        <Tabs.Item id={ids.recent} option="new" aria-controls={ids.panel}>
          New
        </Tabs.Item>
      </Tabs>
      <Rule className={styles.Rule} />
      <Content
        id={ids.panel}
        link={Link.Content}
        avatar="base"
        aria-labelledby={label}
      />
    </>
  );
}
