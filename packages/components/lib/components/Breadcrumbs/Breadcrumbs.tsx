import {
  useReducer,
  useEffect,
  useLayoutEffect,
  useMemo,
  FC,
  ReactElement,
} from 'react';
import { Class } from '@gatsby-tv/utilities';

import { Link } from '@lib/components/Link';

import { Crumb, Breadcrumb } from './components/Crumb';

import styles from './Breadcrumbs.scss';

export type { Breadcrumb };

type BufferState = {
  crumbs: Breadcrumb[];
  zombies: Breadcrumb[];
};

type BufferAction = { type: 'sync'; crumbs: Breadcrumb[] } | { type: 'clear' };

function BreadcrumbFilter(
  crumbs: Breadcrumb[]
): (target: Breadcrumb) => boolean {
  return (target) =>
    !crumbs
      .map((value) => JSON.stringify(value))
      .includes(JSON.stringify(target));
}

export interface BreadcrumbsProps {
  className?: string;
  link?: FC<any>;
  crumbs: Breadcrumb[];
  $props?: any;
  onSelect?: (crumb: Breadcrumb) => void;
}

export function Breadcrumbs(props: BreadcrumbsProps): ReactElement {
  const { className, crumbs, link = Link, $props = {}, onSelect } = props;

  const original = useMemo(() => crumbs, []);

  const [{ zombies }, dispatch] = useReducer(
    (state: BufferState, action: BufferAction) => {
      switch (action.type) {
        case 'sync':
          return {
            ...state,
            crumbs: action.crumbs,
            zombies: state.crumbs
              .filter(BreadcrumbFilter(action.crumbs))
              .concat(state.zombies),
          };

        case 'clear':
          return { ...state, zombies: [] };
      }
    },
    { crumbs, zombies: [] }
  );

  useLayoutEffect(() => dispatch({ type: 'sync', crumbs }), [crumbs]);

  useEffect(() => {
    const id = setTimeout(() => dispatch({ type: 'clear' }), 300);
    return () => clearTimeout(id);
  }, [zombies.length]);

  const CrumbsMarkup = crumbs.map((path, index) => (
    <Crumb
      key={`${path.label}.${index}`}
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
      zombie
      link={link}
      path={path}
      $props={$props}
    />
  ));

  return (
    <div className={Class(className, styles.Breadcrumbs)}>
      {CrumbsMarkup}
      {ZombieMarkup}
    </div>
  );
}
