import React from "react";
import { createPortal } from "react-dom";

import { useInjection } from "@lib/utilities/injection";

import { Target, TargetProps } from "./components";

export type { TargetProps as InjectionTargetProps };

export interface InjectionProps {
  children?: React.ReactNode;
  target: string;
  index?: number;
}

export function Injection(props: InjectionProps): React.ReactPortal | null {
  const { children, target, index } = props;
  const container = useInjection(
    index !== undefined ? `${target}-${index}` : target
  );
  return container ? createPortal(children, container) : null;
}

Injection.Target = Target;
