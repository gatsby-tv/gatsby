/* eslint-disable react/display-name */
import React from 'react';

import { Snack } from '@src/components/Snack';

export interface ResponseProps {
  success: string;
  failure?: string;
}

export function Response(
  props: ResponseProps
): (resp: Response) => React.ReactElement {
  const { success, failure } = props;

  return (resp: Response) =>
    resp.ok ? (
      <Snack.Accept message={success} />
    ) : (
      <Snack.Reject message={failure ?? 'An unexpected error occurred'} />
    );
}
