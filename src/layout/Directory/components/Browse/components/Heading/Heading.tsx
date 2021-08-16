import { ReactElement } from 'react';
import { TextDisplay } from '@gatsby-tv/components';

import styles from './Heading.module.scss';

export function Heading(): ReactElement {
  return (
    <TextDisplay className={styles.Heading} size="large">
      Browse
    </TextDisplay>
  );
}
