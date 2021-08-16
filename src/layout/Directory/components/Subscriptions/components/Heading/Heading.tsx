import { ReactElement } from 'react';
import { TextDisplay } from '@gatsby-tv/components';

import styles from './Heading.module.scss';

export interface HeadingProps {
  id: string;
}

export function Heading(props: HeadingProps): ReactElement {
  const { id } = props;

  return (
    <TextDisplay id={id} className={styles.Heading} size="large">
      Subscriptions
    </TextDisplay>
  );
}
