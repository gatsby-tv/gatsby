import { ReactElement } from 'react';
import { Injection, TextMeta } from '@gatsby-tv/components';
import { Class, useFullscreen } from '@gatsby-tv/utilities';

import styles from './PreAlpha.module.scss';

export function PreAlpha(): ReactElement {
  const [fullscreen] = useFullscreen();
  const classes = Class(styles.PreAlpha, fullscreen && styles.Fullscreen);

  return (
    <Injection target="$foreground">
      <TextMeta.Link
        className={classes}
        href="https://github.com/gatsby-tv/gatsby/issues"
        external
      >
        Pre-Alpha
      </TextMeta.Link>
    </Injection>
  );
}
