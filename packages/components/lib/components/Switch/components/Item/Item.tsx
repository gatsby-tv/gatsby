import React from 'react';
import { classNames, ifExists } from '@gatsby-tv/utilities';

import { Connected } from '@lib/components/Connected';
import { useSwitch } from '@lib/utilities/switch';
import { useItem } from '@lib/utilities/item';

import styles from '../../Switch.scss';

export interface ItemProps extends React.AriaAttributes {
  children?: React.ReactNode;
  id?: string;
  className?: string;
  option: string;
}

export function Item(props: ItemProps): React.ReactElement {
  const {
    children,
    id,
    className,
    option,
    'aria-controls': ariaControls,
  } = props;
  const { selection, onSelect } = useSwitch();
  const { itemClass } = useItem();
  const onClick = () => onSelect(option);

  const classes = classNames(className, itemClass, styles.Item);

  return (
    <Connected.Item
      id={id}
      className={classes}
      role="tab"
      tabIndex={selection === option ? 0 : -1}
      aria-selected={ifExists(selection === option)}
      aria-controls={ariaControls}
      onClick={onClick}
    >
      {children}
    </Connected.Item>
  );
}
