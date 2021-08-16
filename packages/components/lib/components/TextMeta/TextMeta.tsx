import { ReactElement } from 'react';
import { Item, ItemProps } from './components/Item';
import { List, ListProps } from './components/List';
import { Link, LinkProps } from './components/Link';
import { Time, TimeProps } from './components/Time';
import { Data, DataProps } from './components/Data';

export type { ListProps as TextMetaListProps };
export type { LinkProps as TextMetaLinkProps };
export type { TimeProps as TextMetaTimeProps };
export type { DataProps as TextMetaDataProps };

export type TextMetaProps = Omit<ItemProps, 'element' | 'dateTime' | 'value'>;

export function TextMeta(props: TextMetaProps): ReactElement {
  return <Item {...props} />;
}

TextMeta.List = List;
TextMeta.Link = Link;
TextMeta.Time = Time;
TextMeta.Data = Data;
TextMeta.displayName = 'TextMeta';
