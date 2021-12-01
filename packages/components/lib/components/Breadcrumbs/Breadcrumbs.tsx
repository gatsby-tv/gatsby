import {
  useReducer,
  useEffect,
  useLayoutEffect,
  useMemo,
  FC,
  ReactElement,
} from 'react';
import { Class } from '@gatsby-tv/utilities';
import stringify from 'json-stable-stringify';

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
  const stringified = crumbs.map((value) => stringify(value));
  return (target) => !stringified.includes(stringify(target));
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
          const zombies = state.crumbs.filter(BreadcrumbFilter(action.crumbs));

          const offset =
            action.crumbs.length + zombies.length - state.crumbs.length;

          return {
            ...state,
            crumbs: action.crumbs,
            zombies: zombies.slice(offset).concat(state.zombies),
          };

        case 'clear':
          return { ...state, zombies: [] };
      }
    },
    { crumbs, zombies: [] }
  );

  useLayoutEffect(
    () => dispatch({ type: 'sync', crumbs }),
    [stringify(crumbs)]
  );

  useEffect(() => {
    const id = setTimeout(() => dispatch({ type: 'clear' }), 300);
    return () => clearTimeout(id);
  }, [stringify(zombies)]);

  const CrumbsMarkup = crumbs.map((path, index) => (
    <Crumb
      key={`${stringify(path)}.${index}`}
      animate={!original.includes(path)}
      link={link}
      path={path}
      $props={$props}
      onClick={onSelect}
    />
  ));

  const ZombieMarkup = zombies.map((path, index) => (
    <Crumb
      key={`${stringify(path)}.${index}.zombie`}
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
