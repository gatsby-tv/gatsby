import React, { useEffect } from 'react';
import { Rule, TextDisplay } from '@gatsby-tv/components';
import { Channel, Listing } from '@gatsby-tv/content';
import { useUniqueId, useFrame } from '@gatsby-tv/utilities';
import { User } from '@gatsby-tv/types';

import { Page } from '@src/components/Page';
import { Link } from '@src/components/Link';
import { useChannelModal } from '@src/utilities/channel-modal';
import { useSession } from '@src/utilities/session';
import styles from '@src/styles/Home.module.scss';

export default function IndexPage(): React.ReactElement {
  const { screen } = useFrame();
  const recommendedId = useUniqueId('recommended');
  const recommendedLabel = useUniqueId('heading');
  const [, setChannel] = useChannelModal();
  const [session] = useSession();

  return (
    <Page title="Gatsby">
      <Page.Body>
        <Channel.Carousel onSelect={setChannel} />
        <Rule className={styles.Rule} />
        <TextDisplay id={recommendedLabel} className={styles.Heading}>
          Recommended
        </TextDisplay>
        <Listing.Recommended
          id={recommendedId}
          user={session?.user as User | undefined}
          link={Link.Content}
          avatar={screen.width > 650 ? 'base' : 'smaller'}
          aria-labelledby={recommendedLabel}
        />
      </Page.Body>
    </Page>
  );
}
