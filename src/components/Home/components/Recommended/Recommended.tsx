import { ReactElement } from 'react';
import { TextDisplay } from '@gatsby-tv/components';
import { Listing } from '@gatsby-tv/content';
import { useUniqueId, useFrame } from '@gatsby-tv/utilities';
import { User } from '@gatsby-tv/types';

import { Link } from '@src/components/Link';

import styles from './Recommended.module.scss';

export interface RecommendedProps {
  user?: User;
}

export function Recommended(props: RecommendedProps): ReactElement {
  const { user } = props;
  const id = useUniqueId('recommended');
  const label = useUniqueId('heading');
  const { screen } = useFrame();
  const tight = screen.width > 650;

  return (
    <>
      <TextDisplay id={label} className={styles.Heading}>
        Recommended
      </TextDisplay>
      <Listing.Recommended
        id={id}
        user={user}
        link={Link.Content}
        avatar={tight ? 'base' : 'smaller'}
        aria-labelledby={label}
      />
    </>
  );
}
