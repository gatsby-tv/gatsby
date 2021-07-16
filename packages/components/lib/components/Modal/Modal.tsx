import React, { useCallback } from 'react';
import { ifExists, Class, useModalCallback } from '@gatsby-tv/utilities';

import { Optional } from '@lib/components/Optional';
import { Injection } from '@lib/components/Injection';
import { EventListener } from '@lib/components/EventListener';
import { EventHandler } from '@lib/types';

import styles from './Modal.scss';

export interface ModalProps {
  children?: React.ReactNode;
  className?: string;
  overlay?: boolean;
  active?: boolean;
  zIndex?: number;
  onExit?: () => void;
}

export function Modal(props: ModalProps): React.ReactElement | null {
  const { children, className, overlay, active, zIndex, onExit } = props;

  useModalCallback(onExit, []);

  const onKeyDown = useCallback((event: any) => {
    if (event.code === 'Escape') onExit?.();
  }, []);

  const onPointerDown = useCallback(
    (event: any) => event.stopPropagation(),
    []
  );

  const classes = Class(className, styles.Modal);

  return active ? (
    <Injection target="$foreground">
      <Optional
        component="div"
        active={overlay}
        $props={{
          className: styles.Overlay,
          style: ifExists(zIndex, { zIndex }),
        }}
      >
        <div className={classes} onPointerDown={onPointerDown}>
          {children}
        </div>
      </Optional>
      <EventListener event="keydown" handler={onKeyDown} />
    </Injection>
  ) : null;
}
