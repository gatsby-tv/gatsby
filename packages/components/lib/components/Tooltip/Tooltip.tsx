import { useState, useEffect, RefObject, ReactNode, ReactElement } from 'react';
import type { Placement } from '@popperjs/core';
import { usePopper } from 'react-popper';
import { Class } from '@gatsby-tv/utilities';

import { Injection } from '@lib/components/Injection';

import styles from './Tooltip.scss';

export interface TooltipProps {
  children?: ReactNode;
  className?: string;
  for: RefObject<HTMLElement>;
  offset?: number;
  placement?: Placement;
  elevation?: number;
}

export function Tooltip(props: TooltipProps): ReactElement | null {
  const {
    children,
    className,
    for: target,
    offset,
    placement,
    elevation,
  } = props;

  const [active, setActive] = useState(false);
  const [popper, setPopper] = useState<HTMLDivElement | null>(null);

  const { styles: style, attributes } = usePopper(target.current, popper, {
    placement: placement ?? 'bottom',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, offset ?? 10],
        },
      },
      {
        name: 'preventOverflow',
        options: {
          altBoundary: true,
        },
      },
      {
        name: 'flip',
      },
    ],
  });

  useEffect(() => {
    const onPointerEnter = () => setActive(true);
    const onPointerLeave = () => setActive(false);
    target.current?.addEventListener('pointerenter', onPointerEnter);
    target.current?.addEventListener('pointerleave', onPointerLeave);

    return () => {
      target.current?.removeEventListener('pointerenter', onPointerEnter);
      target.current?.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  const classes = Class(className, styles.Popper);

  return active ? (
    <Injection target="$foreground">
      <div
        ref={setPopper}
        style={style.popper}
        className={classes}
        data-elevation={elevation}
        {...attributes.popper}
      >
        {children}
      </div>
    </Injection>
  ) : null;
}
