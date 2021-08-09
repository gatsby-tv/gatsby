import { ReactElement } from 'react';

import { Item, ItemProps } from '../Item';

export interface TimeProps
  extends Omit<ItemProps, 'element' | 'dateTime' | 'value'> {
  date: Date;
}

export function Time(props: TimeProps): ReactElement {
  const { date, ...rest } = props;

  return <Item element="time" dateTime={date.toISOString()} {...rest} />;
}
