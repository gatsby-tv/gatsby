import React from "react";
import styled from "styled-components";
import { useTheme } from "@gatsby-tv/utilities";

import { cssShadow } from "@lib/styles/shadows";
import { Box, BoxProps } from "@lib/components/Box";
import { useCarousel } from "@lib/utilities/carousel";

export interface SlideProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

const SlideStyle = styled(Box)<BoxProps>`
  display: block;
  cursor: pointer;
  outline: none;
  z-index: 0;
  box-sizing: border-box;
  color: inherit;
  background-color: transparent;
  transition: transform ${(props) => props.theme.duration.fast} ease;

  &:hover {
    z-index: 1;
    transform: scale(1.075);
    ${cssShadow}
  }

  & > * {
    width: 100%;
  }
`;

export function Slide(props: SlideProps): React.ReactElement {
  const { children, onClick } = props;
  const { groups, gap } = useCarousel();
  const theme = useTheme();

  const baseProps = {
    style: { width: `${100 / groups}%` },
    margin: [theme.spacing[0], `calc(${gap} / 2)`],
    onClick,
  };

  return (
    <SlideStyle as="button" {...baseProps}>
      {children}
    </SlideStyle>
  );
}
