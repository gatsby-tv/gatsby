import { useCallback, ReactNode, ReactElement } from 'react';
import { Exists, Class } from '@gatsby-tv/utilities';

import { Optional } from '@lib/components/Optional';
import { Injection } from '@lib/components/Injection';
import { EventListener } from '@lib/components/EventListener';
import { useModalCallback } from '@lib/utilities/modal';
import { EventHandler } from '@lib/types';

import styles from './Modal.scss';

export interface ModalProps {
  children?: ReactNode;
  className?: string;
  overlay?: boolean;
  active?: boolean;
  zIndex?: number;
  onExit?: () => void;
}

export function Modal(props: ModalProps): ReactElement | null {
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
          style: Exists(zIndex, { zIndex }),
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
