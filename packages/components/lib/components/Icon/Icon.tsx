import React from 'react';
import { classNames } from '@gatsby-tv/utilities';

import { IconSize, IconSource } from '@lib/types';

import styles from './Icon.scss';

export interface IconProps extends React.AriaAttributes {
  src: IconSource;
  className?: string;
  size?: IconSize;
}

export function Icon(props: IconProps): React.ReactElement {
  const { src: SvgComponent, className, size = 'base', ...aria } = props;

  const classes = classNames(className, styles.Icon, styles[`Icon-${size}`]);

  return (
    <span className={classes} {...aria}>
      <SvgComponent aria-hidden="true" focusable="false" />
    </span>
  );
}
