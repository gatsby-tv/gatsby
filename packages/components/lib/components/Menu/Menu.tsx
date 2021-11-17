import { useState, RefObject, ReactNode, ReactElement } from 'react';
import { usePopper } from 'react-popper';
import { Class, StylesContext } from '@gatsby-tv/utilities';

import { Modal } from '@lib/components/Modal';
import { Connected } from '@lib/components/Connected';
import { Placement } from '@lib/types';

import { Item, ItemProps } from './components/Item';
import { Link, LinkProps } from './components/Link';
import styles from './Menu.scss';

export type { ItemProps as MenuItemProps };
export type { LinkProps as MenuLinkProps };

export interface MenuProps {
  children?: ReactNode;
  className?: string;
  for: RefObject<HTMLElement>;
  active?: boolean;
  placement?: Placement;
  offset?: number[];
  onExit?: () => void;
}

export function Menu(props: MenuProps): ReactElement {
  const {
    children,
    className,
    active,
    onExit,
    placement = 'bottom',
    offset = [0, 10],
  } = props;

  const [popper, setPopper] = useState<HTMLDivElement | null>(null);
  const { styles: style, attributes } = usePopper(props.for.current, popper, {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: offset as [number, number],
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
        enabled: false,
      },
    ],
  });

  const classes = Class(className, styles.Menu);

  return (
    <StylesContext.Provider value={styles}>
      <Modal active={active} onExit={onExit}>
        <div ref={setPopper} style={style.popper} {...attributes.popper}>
          <Connected className={classes} column>
            {children}
          </Connected>
        </div>
      </Modal>
    </StylesContext.Provider>
  );
}

Menu.Item = Item;
Menu.Link = Link;
