import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  forwardRef,
  Ref,
} from 'react';
import { classNames } from '@gatsby-tv/utilities';

import { Optional } from '@lib/components/Optional';
import { EventListener } from '@lib/components/EventListener';
import { Link as LinkComponent } from '@lib/components/Link';

import { Item, ItemProps } from '../Item';
import styles from '../../TextMeta.scss';

export interface LinkProps
  extends Omit<ItemProps, 'element' | 'clamp' | 'dateTime'> {
  className?: string;
  href?: string;
  external?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (props: LinkProps, ref: Ref<HTMLAnchorElement>) => {
    const { children, className, href, external, ...rest } = props;
    const text = useRef<HTMLElement>(null);
    const [, setTruncated] = useState(false);
    const [, setActive] = useState(false);

    const handleResize = useCallback(() => {
      if (!text.current) return;
      setTruncated(text.current.offsetWidth < text.current.scrollWidth);
    }, []);

    useEffect(() => handleResize(), [handleResize]);

    const classes = classNames(className, styles.Link);

    return (
      <>
        <Item
          ref={text}
          className={classes}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
          {...rest}
        >
          <Optional
            component={LinkComponent}
            active={Boolean(href)}
            $props={{ ref, href, external }}
          >
            {children}
          </Optional>
        </Item>
        <EventListener event="resize" handler={handleResize} />
      </>
    );
  }
);

Link.displayName = 'Link';
