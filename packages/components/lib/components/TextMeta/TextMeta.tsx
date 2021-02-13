import { Item, ItemProps } from "./components/Item";
import { List, ListProps } from "./components/List";
import { Link, LinkProps } from "./components/Link";
import { Time, TimeProps } from "./components/Time";
import { Data, DataProps } from "./components/Data";

export type { ListProps as TextMetaListProps };
export type { LinkProps as TextMetaLinkProps };
export type { TimeProps as TextMetaTimeProps };
export type { DataProps as TextMetaDataProps };
export type { ItemProps as TextMetaProps };

export const TextMeta = Object.assign(Item, {
  List,
  Link,
  Time,
  Data,
  displayName: "TextMeta",
});
