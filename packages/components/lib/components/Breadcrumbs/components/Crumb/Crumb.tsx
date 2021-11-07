import { FC, ReactElement } from 'react';
import { ExtendRight } from '@gatsby-tv/icons';
import { Class, useStyles } from '@gatsby-tv/utilities';

import { Icon } from '@lib/components/Icon';

export type Breadcrumb = {
  label: string;
  $link?: any;
};

export interface CrumbProps {
  className?: string;
  animate?: boolean;
  zombie?: boolean;
  link: FC<any>;
  path: Breadcrumb;
  $props?: any;
  onClick?: (path: Breadcrumb) => void;
}

export function Crumb(props: CrumbProps): ReactElement {
  const {
    className,
    animate,
    zombie,
    link: Link,
    path,
    $props,
    onClick,
  } = props;

  const { label, $link = {} } = path;
  const styles = useStyles();

  return (
    <>
      <Icon
        className={Class(
          styles.Chevron,
          animate && styles.Appear,
          zombie && styles.Disappear
        )}
        src={ExtendRight}
      />
      <div
        className={Class(
          className,
          animate && styles.Appear,
          zombie && styles.Disappear
        )}
        onClick={() => onClick?.(path)}
      >
        <Link {...$props} {...$link}>
          {label}
        </Link>
      </div>
    </>
  );
}
