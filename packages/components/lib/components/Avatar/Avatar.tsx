import React, { useState, useEffect, useCallback } from 'react';
import { IPFSContent } from '@gatsby-tv/types';
import { classNames, useIPFSContent } from '@gatsby-tv/utilities';

import { DiscreteSize } from '@lib/types';
import { Viewport } from '@lib/components/Viewport';

import styles from './Avatar.scss';

export interface AvatarProps
  extends Omit<React.ImgHTMLAttributes<Element>, 'src'> {
  src?: IPFSContent | string;
  size?: DiscreteSize;
  overlay?: React.ReactNode;
}

type AvatarURLProps = AvatarProps & { src?: string };

type AvatarIPFSProps = AvatarProps & { src: IPFSContent };

function isAvatarURLProps(props: AvatarProps): props is AvatarURLProps {
  return typeof (props as AvatarURLProps).src !== 'object';
}

function AvatarURL(props: AvatarURLProps): React.ReactElement {
  const {
    className,
    size = 'base',
    overlay,
    'aria-label': ariaLabel,
    ...imgProps
  } = props;
  const [loading, setLoading] = useState(true);

  const onLoad = useCallback(() => setLoading(false), []);

  useEffect(() => setLoading(true), [imgProps.src]);

  const classes = classNames(className, styles[`Viewport-${size}`]);
  const imageClasses = classNames(styles.Image, loading && styles.Loading);

  return (
    <Viewport
      className={classes}
      placeholder
      aspectRatio={1}
      rounded="full"
      overlay={overlay}
      aria-label={ariaLabel}
    >
      <img className={imageClasses} alt="" onLoad={onLoad} {...imgProps} />
    </Viewport>
  );
}

function AvatarIPFS(props: AvatarIPFSProps): React.ReactElement {
  const { src, ...rest } = props;
  const { url } = useIPFSContent(src);

  return <AvatarURL src={url} {...rest} />;
}

export function Avatar(props: AvatarProps): React.ReactElement {
  if (isAvatarURLProps(props)) {
    return <AvatarURL {...props} />;
  } else {
    return <AvatarIPFS {...(props as AvatarIPFSProps)} />;
  }
}
