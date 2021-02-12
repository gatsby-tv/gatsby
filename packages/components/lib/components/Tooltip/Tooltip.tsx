import React, { useState, useEffect } from "react";
import { css } from "styled-components";
import type { Placement } from "@popperjs/core";
import { usePopper } from "react-popper";
import { useTheme } from "@gatsby-tv/utilities";

import { cssShadow } from "@lib/styles/shadows";
import { TextBox } from "@lib/components/TextBox";
import { Portal } from "@lib/components/Portal";

export interface TooltipProps {
  children?: string | string[];
  for: React.RefObject<HTMLElement>;
  offset?: number;
  placement?: Placement;
}

export function Tooltip(props: TooltipProps): React.ReactElement | null {
  const { children, offset, placement } = props;
  const theme = useTheme();
  const [active, setActive] = useState(false);
  const [popper, setPopper] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(props.for.current, popper, {
    placement: placement ?? "bottom",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, offset ?? 10],
        },
      },
      {
        name: "preventOverflow",
        options: {
          altBoundary: true,
        },
      },
      {
        name: "flip",
      },
    ],
  });

  const popperStyle = css`
    ${cssShadow}
    pointer-events: none;
    opacity: 0;
    animation-name: appear;
    animation-duration: ${(props) => props.theme.duration.fast};
    animation-fill-mode: forwards;
    animation-delay: ${(props) => props.theme.duration.base};

    @keyframes appear {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }
  `;

  useEffect(() => {
    const mouseEnterHandler = () => setActive(true);
    const mouseLeaveHandler = () => setActive(false);
    props.for.current?.addEventListener("mouseenter", mouseEnterHandler);
    props.for.current?.addEventListener("mouseleave", mouseLeaveHandler);
    return () => {
      props.for.current?.removeEventListener("mouseenter", mouseEnterHandler);
      props.for.current?.removeEventListener("mouseleave", mouseLeaveHandler);
    };
  }, [props.for]);

  const popperProps = {
    ref: setPopper,
    style: styles.popper,
    weight: theme.weight.semiBold,
    font: theme.font[4],
    bg: theme.colors.background[5],
    rounded: theme.border.radius.small,
    padding: [theme.spacing[0.5], theme.spacing[1]],
    zIndex: 1000,
    ...attributes.popper,
  };

  return active ? (
    <Portal id="tooltip">
      <TextBox css={popperStyle} {...popperProps}>
        {children}
      </TextBox>
    </Portal>
  ) : null;
}
