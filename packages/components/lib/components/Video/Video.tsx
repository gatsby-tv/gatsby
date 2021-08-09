import { forwardRef, VideoHTMLAttributes } from 'react';
import { Class } from '@gatsby-tv/utilities';

import styles from './Video.scss';

export type VideoProps = VideoHTMLAttributes<HTMLElement>;

export const Video = forwardRef<HTMLVideoElement, VideoProps>((props, ref) => {
  const { className, ...rest } = props;
  const classes = Class(className, styles.Video);
  return <video ref={ref} className={classes} {...rest} />;
});

Video.displayName = 'Video';
