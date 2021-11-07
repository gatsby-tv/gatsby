import { AriaAttributes, ReactElement } from 'react';
import { Class } from '@gatsby-tv/utilities';

import { IconSize, IconSource } from '@lib/types';

import styles from './Icon.scss';

export interface IconProps extends AriaAttributes {
  src: IconSource;
  className?: string;
  size?: IconSize;
}

export function Icon(props: IconProps): ReactElement {
  const { src: SvgComponent, className, size, ...aria } = props;

  const classes = Class(className, styles.Icon, size && styles[`Icon-${size}`]);

  return (
    <span className={classes} {...aria}>
      <SvgComponent aria-hidden="true" focusable="false" />
    </span>
  );
}
