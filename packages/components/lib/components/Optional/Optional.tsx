import React from 'react';

export interface OptionalProps {
  children?: React.ReactNode;
  component?: React.FC<any> | string;
  active?: boolean;
  $props?: any;
}

export function Optional(props: OptionalProps): React.ReactElement {
  const { children, active, component, $props = {} } = props;

  return component && active ? (
    React.createElement(component, { children, ...$props })
  ) : (
    <>{children}</>
  );
}
