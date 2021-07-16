import React, { useState, useEffect, useCallback } from 'react';
import { IPFSContent } from '@gatsby-tv/types';
import { Class, ifExists, useIPFSContent } from '@gatsby-tv/utilities';

import { BorderRadius } from '@lib/types';
import { Viewport } from '@lib/components/Viewport';

import styles from './Image.scss';

export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<Element>, 'src'> {
  src?: IPFSContent | string;
  rounded?: BorderRadius;
  aspectRatio?: number;
  overlay?: React.ReactNode;
}

type ImageURLProps = ImageProps & { src?: string };

type ImageIPFSProps = ImageProps & { src: IPFSContent };

function isImageURLProps(props: ImageProps): props is ImageURLProps {
  return typeof (props as ImageURLProps).src !== 'object';
}

function ImageURL(props: ImageURLProps): React.ReactElement {
  const {
    className,
    rounded,
    aspectRatio = 1,
    overlay,
    'aria-label': ariaLabel,
    ...imgProps
  } = props;

  const [loading, setLoading] = useState(true);
  const onLoad = useCallback(() => setLoading(false), []);

  useEffect(() => setLoading(true), [imgProps.src]);

  const classes = Class(className, styles.Viewport);

  return (
    <Viewport
      className={classes}
      placeholder
      rounded={rounded}
      overlay={overlay}
      aspectRatio={aspectRatio}
      aria-label={ariaLabel}
    >
      <img
        style={ifExists(loading, {
          paddingTop: `${100 * aspectRatio}%`,
        })}
        className={Class(
          styles.Image,
          rounded && styles[`Radius-${rounded}`],
          loading && styles.Loading
        )}
        onLoad={onLoad}
        {...imgProps}
      />
    </Viewport>
  );
}

function ImageIPFS(props: ImageIPFSProps): React.ReactElement {
  const { src, ...rest } = props;
  const { url } = useIPFSContent(src);

  return <ImageURL src={url} {...rest} />;
}

export function Image(props: ImageProps): React.ReactElement {
  if (isImageURLProps(props)) {
    return <ImageURL {...props} />;
  } else {
    return <ImageIPFS {...(props as ImageIPFSProps)} />;
  }
}
