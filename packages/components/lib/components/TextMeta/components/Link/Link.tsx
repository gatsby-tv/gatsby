import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  forwardRef,
} from "react";
import styled from "styled-components";
import { ifExists } from "@gatsby-tv/utilities";

import { cssTextSubdued } from "@lib/styles/typography";
import { cssTransition } from "@lib/styles/transition";
import { Optional } from "@lib/components/Optional";
import { EventListener } from "@lib/components/EventListener";
import { Link as LinkComponent } from "@lib/components/Link";

import { Item, ItemProps } from "../Item";

interface LinkBaseProps {
  font?: string;
  bold?: boolean;
  heading?: boolean;
}

const LinkBase = styled(Item)<LinkBaseProps>`
  ${cssTextSubdued}
  ${(props) => cssTransition("color", props.theme.duration.fastest, "ease")}
  width: fit-content;

  @media(hover: hover) and (pointer: fine) {
    &:hover {
      color: ${(props) => props.theme.colors.font.body.toString()};
    }
  }
`;

export interface LinkProps extends ItemProps {
  children?: string | [string];
  id?: string;
  href?: string;
  external?: boolean;
  onClick?: () => void;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (props: LinkProps, ref) => {
    const text = useRef<HTMLParagraphElement>(null);
    const [, setTruncated] = useState(false);
    const [, setActive] = useState(false);
    const { children, id, href, external, onClick, ...rest } = props;

    const handleResize = useCallback(() => {
      if (!text.current) return;
      setTruncated(text.current.offsetWidth < text.current.scrollWidth);
    }, []);

    useEffect(() => handleResize(), [handleResize]);

    const textProps = {
      ref: text,
      id,
      onMouseEnter: () => setActive(true),
      onMouseLeave: () => setActive(false),
      ...rest,
    };

    const linkProps = {
      ref: ref as React.RefObject<HTMLAnchorElement>,
      href,
      external,
      onClick,
    };

    const optionalProps = {
      active: ifExists(href),
      $props: linkProps,
    };

    return (
      <>
        <LinkBase {...textProps}>
          <Optional component={LinkComponent} {...optionalProps}>
            {children}
          </Optional>
        </LinkBase>
        <EventListener event="resize" handler={handleResize} />
      </>
    );
  }
);

Link.displayName = "Link";
