import { AriaAttributes, ReactNode, ReactElement } from 'react';
import { Class, Exists, useStyles } from '@gatsby-tv/utilities';

import { useSelection } from '@lib/utilities/selection';
import { useItem } from '@lib/utilities/item';

export interface ItemProps extends AriaAttributes {
  children?: ReactNode;
  id?: string;
  className?: string;
  option: string;
}

export function Item(props: ItemProps): ReactElement {
  const { children, id, className, option, ...aria } = props;
  const styles = useStyles();
  const { selection, setSelection } = useSelection();
  const { itemClass } = useItem();
  const onClick = () => setSelection(option);

  const classes = Class(className, itemClass, styles.Item);

  return (
    <div
      id={id}
      className={classes}
      role="tab"
      tabIndex={selection === option ? 0 : -1}
      onClick={onClick}
      aria-selected={Exists(selection === option)}
      {...aria}
    >
      {children}
    </div>
  );
}
