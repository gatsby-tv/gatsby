import React from 'react';
import { Icon, Snack } from '@gatsby-tv/components';
import { Checkmark } from '@gatsby-tv/icons';

import styles from './Accept.module.scss';

export interface AcceptProps {
  message: string;
}

export function Accept(props: AcceptProps): React.ReactElement {
  const { message } = props;

  const SuffixMarkup = (
    <Icon className={styles.Accept} src={Checkmark} size="small" />
  );

  return <Snack suffix={SuffixMarkup}>{message}</Snack>;
}
