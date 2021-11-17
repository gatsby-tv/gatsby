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

import { Viewport } from '@lib/components/Viewport';
import { Optional } from '@lib/components/Optional';
import { BorderRadius } from '@lib/types';

import styles from './Image.scss';

export interface ImageProps extends Omit<ImgHTMLAttributes<Element>, 'src'> {
  src?: IPFSContent | string;
  rounded?: BorderRadius;
  aspectRatio?: string | number;
  overlay?: ReactNode;
}

type ImageURLProps = ImageProps & { src?: string };

type ImageIPFSProps = ImageProps & { src: IPFSContent };

function isImageURLProps(props: ImageProps): props is ImageURLProps {
  return typeof (props as ImageURLProps).src !== 'object';
}

function ImageURL(props: ImageURLProps): ReactElement {
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

  return (
    <Optional active={Boolean(className)} $props={{ className }}>
      <Viewport
        className={Class("Image", styles.Viewport)}
        placeholder
        rounded={rounded}
        overlay={overlay}
        aspectRatio={aspectRatio}
        aria-label={ariaLabel}
      >
        <img
          className={Class(styles.Image, loading && styles.Loading)}
          onLoad={onLoad}
          {...imgProps}
        />
      </Viewport>
    </Optional>
  );
}

function ImageIPFS(props: ImageIPFSProps): ReactElement {
  const { src, ...rest } = props;
  const { url } = useIPFSContent(src);

  return <ImageURL src={url} {...rest} />;
}

export function Image(props: ImageProps): ReactElement {
  if (isImageURLProps(props)) {
    return <ImageURL {...props} />;
  } else {
    return <ImageIPFS {...(props as ImageIPFSProps)} />;
  }
}
