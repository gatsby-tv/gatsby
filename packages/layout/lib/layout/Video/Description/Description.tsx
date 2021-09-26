import { useState, ReactElement } from 'react';
import DOMPurify from 'dompurify';
import {
  Button,
  Optional,
  Injection,
  TextBox,
  Icon,
  Rule,
} from '@gatsby-tv/components';
import { ExtendDown, ExtendUp } from '@gatsby-tv/icons';
import {
  Exists,
  NotExists,
  useMobileDetector,
  useComponentWillMount,
  useStabilizedCallback,
} from '@gatsby-tv/utilities';
import { Browsable } from '@gatsby-tv/types';

import { Skeleton } from './Description.skeleton';
import styles from './Description.scss';

export interface DescriptionProps {
  target?: string;
  content?: Browsable;
}

export function Description(props: DescriptionProps): ReactElement {
  const { target, content } = props;
  const isMobile = useMobileDetector();
  const mounted = useComponentWillMount();
  const [clamp, setClamp] = useState(true);

  const onClick = useStabilizedCallback(
    () => setClamp((current) => !current),
    []
  );

  if (!mounted || !content) return <Skeleton />;

  const TextMarkup = DOMPurify.sanitize(content.description, {
    USE_PROFILES: { html: true },
  });

  const ShowMoreMarkup = isMobile ? (
    <Icon className={styles.ShowMoreIcon} src={clamp ? ExtendDown : ExtendUp} />
  ) : (
    <Button className={styles.ShowMoreButton} onClick={onClick}>
      {clamp ? 'Show More' : 'Show Less'}
    </Button>
  );

  return (
    <Optional
      component={Button}
      active={isMobile}
      $props={{ className: styles.Mobile, unstyled: true, onClick }}
    >
      <TextBox
        className={styles.Description}
        clamp={Exists(clamp, 3)}
        dangerouslySetInnerHTML={{ __html: TextMarkup }}
      />
      <Injection.Target id={NotExists(clamp, target)} />
      <Rule>{ShowMoreMarkup}</Rule>
    </Optional>
  );
}
