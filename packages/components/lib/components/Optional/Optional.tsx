import React from "react";

export interface OptionalProps {
  children?: React.ReactNode;
  component: React.FC<any>;
  active?: boolean;
  $props?: any;
}

export function Optional(props: OptionalProps): React.ReactElement {
  const { component: Component, $props = {} } = props;

  return props.active ? (
    <Component {...$props}>{props.children}</Component>
  ) : (
    <>{props.children}</>
  );
}
