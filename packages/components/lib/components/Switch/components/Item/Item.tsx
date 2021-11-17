import { AriaAttributes, ReactNode, ReactElement } from 'react';
import { Class, Exists } from '@gatsby-tv/utilities';

import { Connected } from '@lib/components/Connected';
import { useSwitch } from '@lib/utilities/switch';

import styles from './Item.scss';

export interface ItemProps extends AriaAttributes {
  children?: ReactNode;
  id?: string;
  className?: string;
  option: string;
}

export function Item(props: ItemProps): ReactElement {
  const {
    children,
    id,
    className,
    option,
    'aria-controls': ariaControls,
  } = props;

  const { selection, onSelect } = useSwitch();
  const onClick = () => onSelect(option);

  const classes = Class("Item", className, styles.Item);

  return (
    <Connected.Item
      id={id}
      className={classes}
      role="tab"
      tabIndex={selection === option ? 0 : -1}
      aria-selected={Exists(selection === option)}
      aria-controls={ariaControls}
      onClick={onClick}
    >
      {children}
    </Connected.Item>
  );
}
