import React from 'react';
import { Icon, Snack } from '@gatsby-tv/components';
import { Cancel } from '@gatsby-tv/icons';

import styles from './Reject.module.scss';

export interface RejectProps {
  message: string;
}

export function Reject(props: RejectProps): React.ReactElement {
  const { message } = props;

  const SuffixMarkup = (
    <Icon className={styles.Reject} src={Cancel} size="smaller" />
  );

  return <Snack suffix={SuffixMarkup}>{message}</Snack>;
}
