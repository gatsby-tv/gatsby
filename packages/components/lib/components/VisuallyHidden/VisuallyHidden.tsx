import React from 'react';

import styles from './VisuallyHidden.scss';

export interface VisuallyHiddenProps {
  as: string;
  $props?: any;
}

export function VisuallyHidden(props: VisuallyHiddenProps): React.ReactElement {
  const { as: element, $props = {} } = props;
  return React.createElement(element, {
    className: styles.VisuallyHidden,
    ...$props,
  });
}
