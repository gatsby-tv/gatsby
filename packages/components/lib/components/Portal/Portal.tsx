import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useUniqueId } from '@gatsby-tv/utilities';

export interface PortalProps {
  children?: React.ReactNode;
  id?: string;
}

export function Portal(props: PortalProps): React.ReactPortal | null {
  const baseId = useUniqueId('portal');
  const portal = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = props.id ? `${props.id}-${baseId}` : baseId;

    portal.current = document.createElement('div');
    portal.current.id = id;
    document.body.appendChild(portal.current);
    setMounted(true);

    return () => {
      document.body.removeChild(portal.current as HTMLElement);
    };
  }, [props.id, baseId]);

  return (
    (portal.current &&
      mounted &&
      createPortal(props.children, portal.current)) ||
    null
  );
}
