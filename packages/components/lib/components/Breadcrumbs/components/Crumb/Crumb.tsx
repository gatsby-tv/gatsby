import { FC, ReactElement } from 'react';
import { ExtendRight } from '@gatsby-tv/icons';
import { Class } from '@gatsby-tv/utilities';

import { Icon } from '@lib/components/Icon';

import styles from './Crumb.scss';

export type Breadcrumb = {
  label: string;
  key?: string;
  $link?: any;
};

export interface CrumbProps {
  animate?: boolean;
  zombie?: boolean;
  link: FC<any>;
  path: Breadcrumb;
  $props?: any;
  onClick?: (path: Breadcrumb) => void;
}

export function Crumb(props: CrumbProps): ReactElement {
  const {
    animate,
    zombie,
    link: Link,
    path,
    $props,
    onClick,
  } = props;

  const { label, $link = {} } = path;

  return (
    <>
      <Icon
        className={Class(
          "Separator",
          styles.Chevron,
          animate && styles.Appear,
          zombie && styles.Disappear
        )}
        src={ExtendRight}
      />
      <div
        className={Class(
          "Crumb",
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
