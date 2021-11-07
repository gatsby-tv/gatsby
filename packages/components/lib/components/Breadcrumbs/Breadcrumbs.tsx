import {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
  FC,
  ReactElement,
} from 'react';
import { Class, StylesContext } from '@gatsby-tv/utilities';

import { Link } from '@lib/components/Link';

import { Crumb, Breadcrumb } from './components/Crumb';

import styles from './Breadcrumbs.scss';

export type { Breadcrumb };

export interface BreadcrumbsProps {
  className?: string;
  itemClass?: string;
  link?: FC<any>;
  crumbs: Breadcrumb[];
  $props?: any;
  onSelect?: (crumb: Breadcrumb) => void;
}

export function Breadcrumbs(props: BreadcrumbsProps): ReactElement {
  const {
    className,
    itemClass,
    crumbs,
    link = Link,
    $props = {},
    onSelect,
  } = props;

  const original = useMemo(() => crumbs, []);
  const buffer = useRef(crumbs);
  const [zombies, setZombies] = useState<Breadcrumb[]>([]);

  useLayoutEffect(() => {
    setZombies((current) =>
      buffer.current.filter((crumb) => !crumbs.includes(crumb)).concat(current)
    );

    buffer.current = crumbs;
  }, [crumbs]);

  useEffect(() => {
    const id = setTimeout(() => setZombies([]), 300);
    return () => clearTimeout(id);
  }, [zombies.length]);

  const CrumbsMarkup = crumbs.map((path, index) => (
    <Crumb
      key={`${path.label}.${index}`}
      className={itemClass}
      animate={!original.includes(path)}
      link={link}
      path={path}
      $props={$props}
      onClick={onSelect}
    />
  ));

  const ZombieMarkup = zombies.map((path, index) => (
    <Crumb
      key={`${path.label}.${index}.zombie`}
      className={itemClass}
      zombie
      link={link}
      path={path}
      $props={$props}
    />
  ));

  return (
    <StylesContext.Provider value={styles}>
      <div className={Class(className, styles.Breadcrumbs)}>
        {CrumbsMarkup}
        {ZombieMarkup}
      </div>
    </StylesContext.Provider>
  );
}
