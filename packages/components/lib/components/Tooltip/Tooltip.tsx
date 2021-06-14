import React, { useState, useEffect } from 'react';
import type { Placement } from '@popperjs/core';
import { usePopper } from 'react-popper';
import { classNames } from '@gatsby-tv/utilities';

import { Injection } from '@lib/components/Injection';

import styles from './Tooltip.scss';

export interface TooltipProps {
  children?: React.ReactNode;
  className?: string;
  for: React.RefObject<HTMLElement>;
  offset?: number;
  placement?: Placement;
}

export function Tooltip(props: TooltipProps): React.ReactElement | null {
  const { children, className, for: target, offset, placement } = props;
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

  const classes = classNames(className, styles.Popper);

  return active ? (
    <Injection target="$foreground">
      <div
        ref={setPopper}
        style={style.popper}
        className={classes}
        {...attributes.popper}
      >
        {children}
      </div>
    </Injection>
  ) : null;
}
