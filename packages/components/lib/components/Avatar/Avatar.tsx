import {
  useState,
  useEffect,
  useCallback,
  ImgHTMLAttributes,
  ReactNode,
  ReactElement,
} from 'react';
import { IPFSContent } from '@gatsby-tv/types';
import { Class, useIPFSContent } from '@gatsby-tv/utilities';

import { DiscreteSize } from '@lib/types';
import { Viewport } from '@lib/components/Viewport';

import styles from './Avatar.scss';

export interface AvatarProps extends Omit<ImgHTMLAttributes<Element>, 'src'> {
  src?: IPFSContent | string;
  size?: DiscreteSize;
  overlay?: ReactNode;
}

type AvatarURLProps = AvatarProps & { src?: string };

type AvatarIPFSProps = AvatarProps & { src: IPFSContent };

function isAvatarURLProps(props: AvatarProps): props is AvatarURLProps {
  return typeof (props as AvatarURLProps).src !== 'object';
}

function AvatarURL(props: AvatarURLProps): ReactElement {
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

  const classes = Class(className, styles[`Viewport-${size}`]);
  const imageClasses = Class(styles.Image, loading && styles.Loading);

  return (
    <Viewport
      className={classes}
      placeholder
      rounded="full"
      overlay={overlay}
      aria-label={ariaLabel}
    >
      <img className={imageClasses} alt="" onLoad={onLoad} {...imgProps} />
    </Viewport>
  );
}

function AvatarIPFS(props: AvatarIPFSProps): ReactElement {
  const { src, ...rest } = props;
  const { url } = useIPFSContent(src);

  return <AvatarURL src={url} {...rest} />;
}

export function Avatar(props: AvatarProps): ReactElement {
  if (isAvatarURLProps(props)) {
    return <AvatarURL {...props} />;
  } else {
    return <AvatarIPFS {...(props as AvatarIPFSProps)} />;
  }
}
