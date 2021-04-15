import React from "react";

import { useInjectionTarget } from "@lib/utilities/injection";

export interface TargetProps {
  id: string;
  className?: string;
  index?: number;
}

export function Target(props: TargetProps): React.ReactElement | null {
  const { id: idProp, className, index } = props;
  const id = index !== undefined ? `${idProp}-${index}` : idProp;
  const container = useInjectionTarget(id);

  return container ? (
    <div ref={container} id={id} className={className} />
  ) : null;
}
