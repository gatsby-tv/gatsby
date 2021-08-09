import { createElement, FC, ReactNode, ReactElement } from 'react';

export interface OptionalProps {
  children?: ReactNode;
  component?: FC<any> | string;
  active?: boolean;
  $props?: any;
}

export function Optional(props: OptionalProps): ReactElement {
  const { children, active, component = 'div', $props = {} } = props;

  return active ? (
    createElement(component, { children, ...$props })
  ) : (
    <>{children}</>
  );
}
