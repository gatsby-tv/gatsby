/* eslint-disable react/display-name */
import React from 'react';
import { Icon, Snack } from '@gatsby-tv/components';
import { Checkmark, Cancel } from '@gatsby-tv/icons';

import styles from './Response.module.scss';

export interface ResponseProps {
  success: string;
  failure?: string;
}

export function Response(
  props: ResponseProps
): (resp: Response) => React.ReactElement {
  const { success, failure } = props;

  const SuccessMarkup = (
    <Icon className={styles.Success} src={Checkmark} size="small" />
  );

  const FailureMarkup = (
    <Icon className={styles.Failure} src={Cancel} size="small" />
  );

  return (resp: Response) =>
    resp.ok ? (
      <Snack suffix={SuccessMarkup}>{success}</Snack>
    ) : (
      <Snack suffix={FailureMarkup}>
        {failure ?? 'An unexpected error occurred'}
      </Snack>
    );
}
