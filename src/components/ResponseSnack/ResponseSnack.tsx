import React from 'react';
import { Icon, Snack } from '@gatsby-tv/components';
import { Checkmark, Cancel } from '@gatsby-tv/icons';

import styles from './ResponseSnack.module.scss';

export interface ResponseSnackProps {
  success: string;
  failure?: string;
}

export function ResponseSnack(
  props: ResponseSnackProps
): (resp: Response) => React.ReactElement {
  const { success, failure } = props;

  return (resp: Response) =>
    resp.ok ? (
      <Snack
        suffix={
          <Icon className={styles.Success} src={Checkmark} size="small" />
        }
      >
        {success}
      </Snack>
    ) : (
      <Snack
        suffix={<Icon className={styles.Failure} src={Cancel} size="small" />}
      >
        {failure ?? 'An unexpected error occurred'}
      </Snack>
    );
}
