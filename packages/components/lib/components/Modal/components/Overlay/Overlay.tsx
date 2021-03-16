import React from "react";
import { css } from "styled-components";

import { Flex } from "@lib/components/Flex";
import { Box } from "@lib/components/Box";
import { Card } from "@lib/components/Card";

export interface OverlayProps {
  children?: React.ReactNode;
  zIndex?: number;
}

export function Overlay(props: OverlayProps): React.ReactElement {
  const { children, zIndex } = props;

  const overlay = css`
    background-color: ${(props) =>
      props.theme.colors.black.fade(0.7).toString()};
    backface-visibility: hidden;

    @keyframes fade {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }

    animation-name: fade;
    animation-duration: ${(props) => `${props.theme.duration.fast}ms`};
    animation-fill-mode: forwards;
    animation-timing-function: ease;

    & > ${Box} > ${Card} {
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.9), 0 0 2px rgba(0, 0, 0, 0.1);

      @keyframes slide {
        from {
          transform: translateY(${(props) => props.theme.spacing[4]});
        }

        to {
          transform: translateY(0);
        }
      }

      animation-name: slide;
      animation-duration: ${(props) => `${props.theme.duration.fast}ms`};
      animation-fill-mode: forwards;
      animation-timing-function: ease;
    }
  `;

  return (
    <Flex css={overlay} absolute expand center zIndex={zIndex}>
      {children}
    </Flex>
  );
}
