import { useState, useEffect, useMemo, useCallback, useContext } from 'react';

import { ContextError } from '@lib/errors';

import {
  BreadcrumbsContext,
  BreadcrumbsContextType,
  BreadcrumbPath,
} from './context';

export function useBreadcrumbsContext(
  crumb?: BreadcrumbPath
): BreadcrumbsContextType {
  const parent = useContext(BreadcrumbsContext);

  const [child, register] = useState<BreadcrumbsContextType | undefined>(
    undefined
  );

  const digest = useCallback(
    () => {
      const crumbs = child?.digest() ?? [];
      return crumb ? [crumb, ...crumbs] : crumbs;
    },
    [child, crumb?.label, crumb?.path]
  );

  const context = useMemo(
    () => ({ child, crumb, register, digest }),
    [child, crumb?.label, crumb?.path]
  );

  useEffect(() => {
    if (!crumb) return;
    parent?.register(context);
    return () => parent?.register(undefined);
  }, [Boolean(crumb), context]);

  return context;
}

export function useBreadcrumbs(): BreadcrumbPath[] {
  const context = useContext(BreadcrumbsContext);

  if (!context) {
    throw new ContextError('Breadcrumbs');
  }

  return useMemo(context.digest, [context]);
}
