import { AriaAttributes, ReactNode, ReactElement } from 'react';
import { Class, Exists } from '@gatsby-tv/utilities';

import { useSelection } from '@lib/utilities/selection';

import styles from '@lib/components/Selection/Selection.scss';

export interface ItemProps extends AriaAttributes {
  children?: ReactNode;
  id?: string;
  className?: string;
  option: string;
}

export function Item(props: ItemProps): ReactElement {
  const { children, id, className, option, ...aria } = props;
  const { selection, setSelection } = useSelection();
  const onClick = () => setSelection(option);

  const classes = Class("Item", className, styles.Item);

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
