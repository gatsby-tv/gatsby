import React from 'react';
import { classNames, ifExists } from '@gatsby-tv/utilities';

import { useSelection } from '@lib/utilities/selection';
import { useItem } from '@lib/utilities/item';

import styles from '../../Selection.scss';

export interface ItemProps extends React.AriaAttributes {
  children?: React.ReactNode;
  id?: string;
  className?: string;
  option: string;
}

export function Item(props: ItemProps): React.ReactElement {
  const { children, id, className, option, ...aria } = props;
  const { selection, setSelection } = useSelection();
  const { itemClass } = useItem();
  const onClick = () => setSelection(option);

  const classes = classNames(className, itemClass, styles.Item);

  return (
    <div
      id={id}
      className={classes}
      role="tab"
      tabIndex={selection === option ? 0 : -1}
      onClick={onClick}
      aria-selected={ifExists(selection === option)}
      {...aria}
    >
      {children}
    </div>
  );
}
