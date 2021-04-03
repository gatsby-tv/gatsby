import React, {
  useState,
  useEffect,
  useCallback,
  forwardRef,
} from "react";
import styled, { css } from "styled-components";
import Color from "color";
import { ifExists, ifNotExists, useTheme, useForwardedRef } from "@gatsby-tv/utilities";

import { Tooltip } from "@lib/components/Tooltip";
import { Size, Margin } from "@lib/types";
import { cssShadow } from "@lib/styles/shadows";
import { cssTransition } from "@lib/styles/transition";
import { cssSize, cssMargin } from "@lib/styles/size";
import { cssProperty } from "@lib/styles/property";
import { cssTextButton } from "@lib/styles/typography";

export type ButtonProps = {
  unstyled?: boolean;
  animate?: boolean;
  shadow?: boolean;
  rounded?: Size;
  margin?: Margin;
  padding?: Margin;
  w?: Size;
  h?: Size;
  bg?: Color;
  fg?: Color;
  highlight?: Color | Color[];
  font?: string;
  tooltip?: string;
  zIndex?: number;
  asLabelFor?: string;
  onClick?: (event: any) => void;
  onDblClick?: (event: any) => void;
} & React.ButtonHTMLAttributes<HTMLElement>;

const cssHighlight = (highlight?: Color | Color[], animated?: boolean) => css`
  @media(hover: hover) and (pointer: fine) {
    &:not(:disabled):hover,
    &:not(:disabled):active {
      ${cssProperty("background-color", [highlight].flat()[0]?.toString())}
    }
  }

  &:not(:disabled):active {
    ${cssProperty(
      "background-color",
      ifNotExists(animated, [highlight].flat()[1]?.toString())
    )}
  }
`;

const cssAnimate = (highlight?: Color | Color[], rounded?: Size) => css`
  &:before {
    content: "";
    pointer-events: none;
    backface-visibility: hidden;
    ${(props) =>
      cssSize("border-radius", rounded, props.theme.border.radius.small)}
    ${(props) =>
      cssProperty(
        "background-color",
        [highlight].flat()[1]?.toString(),
        props.theme.colors.font.body.toString()
      )}
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    ${(props) => cssTransition("all", props.theme.duration.faster, "ease")}
  }

  &[data-animating]:before {
    opacity: 0.2;
    animation-name: highlight;
    animation-duration: ${(props) => `${props.theme.duration.faster}ms`};
    animation-timing-function: cubic-bezier(0.2, 1, 0.6, 1);
  }

  @keyframes highlight {
    from {
      transform: scale(0);
    }

    to {
      transform: scale(1);
    }
  }
`;

const cssPadding = (padding?: Margin, rounded?: Size) => css`
  ${(props) =>
    cssMargin(
      "padding",
      padding,
      rounded === props.theme.border.radius.full
        ? props.theme.spacing[1]
        : [props.theme.spacing[0.5], props.theme.spacing[1]]
    )}
`;

const ButtonStyle = styled.button<ButtonProps>`
  cursor: pointer;
  display: block;
  position: relative;
  outline: none;
  ${(props) => ifNotExists(props.unstyled, cssTextButton)}
  ${(props) => cssProperty("text-align", ifExists(props.unstyled, "inherit"))}
  ${(props) => ifExists(props.shadow, cssShadow)}
  ${(props) =>
    cssSize("width", props.w, ifExists(props.asLabelFor, "fit-content"))}
  ${(props) => cssSize("height", props.h)}
  ${(props) => cssProperty("z-index", props.zIndex?.toString())}
  ${(props) => cssProperty("font-size", props.font)}
  ${(props) =>
    cssProperty(
      "color",
      props.fg?.toString(),
      props.theme.colors.font.body.toString()
    )}
  ${(props) =>
    cssSize("border-radius", props.rounded, props.theme.border.radius.small)}
  ${(props) =>
    ifNotExists(props.unstyled, cssPadding(props.padding, props.rounded))}
  ${(props) => cssMargin("margin", props.margin)}
  ${(props) =>
    ifExists(props.highlight, cssHighlight(props.highlight, props.animate))}
  ${(props) =>
    ifExists(props.animate, cssAnimate(props.highlight, props.rounded))}

  &:not(:disabled) {
    ${(props) =>
      cssProperty("background-color", props.bg?.toString(), "transparent")}
  }

  &:disabled {
    ${(props) =>
      cssProperty(
        "background-color",
        ifExists(props.bg, props.theme.colors.placeholder)
      )}
  }
`;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps, ref: React.Ref<HTMLButtonElement>) => {
    const theme = useTheme();
    const button = useForwardedRef<HTMLButtonElement>(ref);
    const [click, setClick] = useState<MouseEvent>();
    const [dblClick, setDblClick] = useState<MouseEvent>();
    const [reset, setReset] = useState(false);
    const [active, setActive] = useState(0);
    const [held, setHeld] = useState(false);
    const {
      animate,
      tooltip,
      asLabelFor,
      onClick: onClickHandler,
      onDblClick: onDblClickHandler,
      ...rest
    } = props;

    useEffect(() => {
      if (dblClick && onDblClickHandler) {
        onDblClickHandler(dblClick);
      }
    }, [dblClick]);

    useEffect(() => {
      if (click) {
        const id = setTimeout(() => {
          if (onClickHandler) {
            onClickHandler(click);
          }
          setClick(undefined);
        }, theme.duration.fast);
        return () => clearTimeout(id);
      }
    }, [click]);

    useEffect(() => {
      if (active) {
        const id = setTimeout(() => setActive(0), theme.duration.faster);
        return () => clearTimeout(id);
      }
    }, [active]);

    const onClick = useCallback((event: any) => {
      if (onDblClickHandler) {
        setClick((current) => {
          if (current) {
            // We can't potentially update our parent's state here, so
            // we wait until a useEffect handler is invoked instead.
            setDblClick(event);
          } else {
            return event;
          }
        });
      } else if (onClickHandler) {
        onClickHandler(event);
      }
    }, [onClickHandler, onDblClickHandler]);

    const onPointerDown = useCallback(
      (event) => {
        event.stopPropagation();
        if (animate) {
          setReset(true);
          setHeld(true);
          setActive((current) => current + 1);

          const id = window.requestAnimationFrame(() => setReset(false));
          return () => window.cancelAnimationFrame(id);
        }
      },
      [animate]
    );

    const onPointerUp = useCallback(
      (event) => {
        event.stopPropagation();
        if (animate) {
          setHeld(false);
        }
      },
      [animate]
    );

    const buttonProps = {
      ref: button,
      asLabelFor,
      animate,
      htmlFor: asLabelFor,
      tabIndex: ifExists(asLabelFor, -1),
      "aria-label": tooltip,
      "data-animating": ifExists(animate && !reset && (active || held)),
      onClick,
      onPointerDown,
      onPointerUp,
      onPointerLeave: onPointerUp,
      onPointerCancel: onPointerUp,
      ...rest,
    };

    const TooltipMarkup =
      tooltip && !held ? (
        <Tooltip for={button} offset={7}>
          {tooltip}
        </Tooltip>
      ) : null;

    return (
      <>
        <ButtonStyle as={ifExists(asLabelFor, "label")} {...buttonProps} />
        {TooltipMarkup}
      </>
    );
  }
);

Button.displayName = "Button";
