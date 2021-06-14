import React from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children?: React.ReactNode;
  target?: HTMLElement | null;
}

export function Portal(props: PortalProps): React.ReactPortal | null {
  const { children, target } = props;
  return target && children ? createPortal(children, target) : null;
}
