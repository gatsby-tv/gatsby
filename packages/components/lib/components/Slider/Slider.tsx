import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  ifExists,
  ifNotExists,
  useTheme,
  useResizeObserver,
  useParentRef,
} from "@gatsby-tv/utilities";
import { ExtendLeft, ExtendRight } from "@gatsby-tv/icons";

import { Box } from "@lib/components/Box";
import { Flex } from "@lib/components/Flex";
import { Button } from "@lib/components/Button";
import { Icon } from "@lib/components/Icon";
import { Size } from "@lib/types";

import { Tray } from "./components/Tray";

export interface SliderProps {
  children?: React.ReactNode;
  groups: number;
  gap?: Size;
  maxw?: Size;
}

export function Slider(props: SliderProps): React.ReactElement {
  const { children, groups, gap, maxw } = props;
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [leftButton, setLeftButton] = useState(false);
  const [rightButton, setRightButton] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const parent = useParentRef<HTMLDivElement>(container);

  useResizeObserver(parent, (content) => setWidth(content.inlineSize));

  const maxIndex = Math.ceil(React.Children.count(children) / groups) - 1;

  const increment = useCallback(
    () => setIndex((current) => Math.min(current + 1, maxIndex)),
    [maxIndex]
  );

  const decrement = useCallback(
    () => setIndex((current) => Math.max(current - 1, 0)),
    []
  );

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    const id = setTimeout(() => {
      setLeftButton(index !== 0);
      setRightButton(index !== maxIndex);
    }, 300);

    return () => clearTimeout(id);
  }, [index, maxIndex]);

  const containerProps = {
    ref: container,
    style: { width: ifExists(width && ifNotExists(maxw), `${width}px`) },
    expand: true,
    maxw,
  };

  const trayProps = {
    style: {
      transform: gap
        ? `translateX(calc(${-100 * index}% - ${index} * ${gap}))`
        : `translateX(${-100 * index}%)`,
    },
    groups,
    gap,
  };

  const buttonBoxProps = {
    absolute: true,
    top: `calc(50% - ${theme.spacing[2]})`,
  };

  const buttonProps = {
    animate: true,
    shadow: true,
    rounded: theme.border.radius.full,
    bg: theme.colors.background[5],
    padding: theme.spacing[1],
  };

  const SlidesMarkup = React.Children.map(children, (child) => (
    <Flex.Item shrink={0}>{child}</Flex.Item>
  ));

  const LeftButtonMarkup = leftButton ? (
    <Box left={theme.spacing[1]} {...buttonBoxProps}>
      <Button onClick={decrement} {...buttonProps}>
        <Icon src={ExtendLeft} w={theme.icon.base} />
      </Button>
    </Box>
  ) : null;

  const RightButtonMarkup = rightButton ? (
    <Box right={theme.spacing[1]} {...buttonBoxProps}>
      <Button onClick={increment} {...buttonProps}>
        <Icon src={ExtendRight} w={theme.icon.base} />
      </Button>
    </Box>
  ) : null;

  return (
    <Box css={{ overflowX: "hidden" }} {...containerProps}>
      <Tray {...trayProps}>{SlidesMarkup}</Tray>
      {LeftButtonMarkup}
      {RightButtonMarkup}
    </Box>
  );
}
