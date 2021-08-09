import { ReactNode, ReactPortal } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children?: ReactNode;
  target?: HTMLElement | null;
}

export function Portal(props: PortalProps): ReactPortal | null {
  const { children, target } = props;
  return target && children ? createPortal(children, target) : null;
}
