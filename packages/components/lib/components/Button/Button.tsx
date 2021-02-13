import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
} from "react";
import styled, { css } from "styled-components";
import Color from "color";
import { ifExists, ifNotExists, useForwardedRef } from "@gatsby-tv/utilities";

import { Tooltip } from "@lib/components/Tooltip";
import { Size, Margin } from "@lib/types";
import { cssShadow } from "@lib/styles/shadows";
import { cssSize, cssMargin } from "@lib/styles/size";
import { cssProperty } from "@lib/styles/property";
import { cssTextButton } from "@lib/styles/typography";

export type ButtonProps = {
  unstyled?: boolean;
  animate?: boolean;
  shadow?: boolean;
  rounded?: Size;
  padding?: Margin;
  w?: Size;
  h?: Size;
  bg?: Color;
  fg?: Color;
  highlight?: Color | Color[];
  font?: string;
  tooltip?: string;
  zIndex?: number;
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLElement>;

const cssHighlight = (highlight?: Color | Color[], animated?: boolean) => css`
  &:not(:disabled):hover,
  &:not(:disabled):active {
    ${cssProperty("background-color", [highlight].flat()[0]?.toString())}
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
    transition: all ${(props) => props.theme.duration.faster} ease;
  }

  &[data-animating]:before {
    opacity: 0.2;
    animation-name: highlight;
    animation-duration: ${(props) => props.theme.duration.faster};
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
  ${(props) => cssSize("width", props.w)}
  ${(props) => cssSize("height", props.h)}
  ${(props) => cssProperty("z-index", props.zIndex?.toString())}
  ${(props) => cssProperty("font-size", props.font)}
  ${(props) =>
    cssProperty(
      "color",
      props.fg?.toString(),
      props.theme.colors.font.body.darken(0.1).toString()
    )}
  ${(props) =>
    cssSize("border-radius", props.rounded, props.theme.border.radius.small)}
  ${(props) =>
    ifNotExists(props.unstyled, cssPadding(props.padding, props.rounded))}
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
    const key = useRef(0);
    const button = useForwardedRef<HTMLButtonElement>(ref);
    const [active, setActive] = useState(0);
    const [held, setHeld] = useState(false);
    const { onClick = () => undefined, ...rest } = props;

    useEffect(() => {
      if (active) {
        const id = setTimeout(() => setActive(0), 200);
        return () => clearTimeout(id);
      }
    }, [active]);

    /*
     * The reason that we don't just pass onClick to the component
     * like all of the other event handlers is due to a pretty interesting
     * edge case.
     *
     * Since React insists that it handles all events itself, the onClick
     * handler will not fire if we force React to remount the button on
     * the onPointerDown event. When the onPointerDown event fires, the
     * first stage of an onClick event initiates for our button, however,
     * we also simultaneously force React to remount the button by
     * changing the button's key. Thus, the button that saw the initiation
     * of the onClick event is no longer the same button that sees the
     * onClick event's conclusion when the mouse is released --- preventing
     * the onClick handler from ever firing.
     */
    useEffect(() => {
      key.current && !held && onClick();
    }, [held]); // eslint-disable-line react-hooks/exhaustive-deps

    const handlePointerDown = useCallback(
      (event: React.SyntheticEvent) => {
        if (props.animate) {
          key.current++;
          setHeld(true);
          setActive((current) => current + 1);
        }

        event.stopPropagation();
      },
      [props.animate]
    );

    const handlePointerUp = useCallback(() => props.animate && setHeld(false), [
      props.animate,
    ]);

    const buttonProps = {
      ref: button,
      key: key.current,
      "data-animating": ifExists(props.animate && (active || held)),
      onPointerDown: handlePointerDown,
      onPointerUp: handlePointerUp,
      onPointerLeave: handlePointerUp,
      onClick: ifNotExists(props.animate, onClick),
      ...rest,
    };

    const TooltipMarkup =
      props.tooltip && !held ? (
        <Tooltip for={button} offset={7}>
          {props.tooltip}
        </Tooltip>
      ) : null;

    return (
      <>
        <ButtonStyle {...buttonProps} />
        {TooltipMarkup}
      </>
    );
  }
);

Button.displayName = "Button";
