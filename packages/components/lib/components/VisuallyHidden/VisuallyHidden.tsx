import { createElement, ReactElement } from 'react';

import styles from './VisuallyHidden.scss';

export interface VisuallyHiddenProps {
  as: string;
  $props?: any;
}

export function VisuallyHidden(props: VisuallyHiddenProps): ReactElement {
  const { as: element, $props = {} } = props;
  return createElement(element, {
    className: styles.VisuallyHidden,
    ...$props,
  });
}
