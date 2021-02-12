import React, {
  useRef,
  useState,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import { ExtendLeft, ExtendRight } from "@gatsby-tv/icons";
import { Negative, useTheme, useResizeObserver } from "@gatsby-tv/utilities";

import { Size } from "@lib/types";
import { CarouselContext } from "@lib/utilities/carousel";
import { Box } from "@lib/components/Box";
import { Flex } from "@lib/components/Flex";
import { Button } from "@lib/components/Button";
import { Icon } from "@lib/components/Icon";

import { Slider, SliderState, SliderAction } from "./components/Slider";
import { Slide, SlideProps } from "./components/Slide";

export type { SlideProps as CarouselSlideProps };

export interface CarouselProps {
  children?: React.ReactNode;
  groups: number;
  gap?: Size;
}

function CarouselBase(props: CarouselProps): React.ReactElement {
  const theme = useTheme();
  const mask = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<string>("100%");
  const { children, groups, gap = theme.spacing[0] } = props;

  /* We need the number of items to divide the number of visible slides evenly.
   * Thus, perhaps controversially, we will remove any remainders. */

  const items = React.Children.count(children);

  const slides = React.Children.toArray(children).slice(
    0,
    items - (items % groups)
  );

  const chunks = Array.from(
    { length: Math.ceil(slides.length / groups) },
    (_, index) => slides.slice(index * groups, (index + 1) * groups)
  );

  const [state, dispatch] = useReducer(
    (state: SliderState, action: SliderAction) => {
      switch (action.type) {
        case "jump":
          return { ...state, desired: action.desired };

        case "sync":
          return { ...state, slide: state.desired };
      }
    },
    { slide: 0, desired: 0 }
  );

  useResizeObserver(mask, (content) => setWidth(`${content.inlineSize}px`));

  useEffect(() => {
    const id = setTimeout(() => dispatch({ type: "sync" }), 500);
    return () => clearTimeout(id);
  }, [state.desired]);

  const next = useCallback(
    () =>
      dispatch({ type: "jump", desired: (state.slide + 1) % chunks.length }),
    [state.slide, chunks.length]
  );

  const prev = useCallback(
    () =>
      dispatch({
        type: "jump",
        desired: (state.slide + chunks.length - 1) % chunks.length,
      }),
    [state.slide, chunks.length]
  );

  const maskStyle = {
    clipPath: `polygon(calc(${Negative(
      gap
    )} / 2) -10%, calc(100% + ${gap} / 2) -10%, calc(100% + ${gap} / 2) 110%, calc(${Negative(
      gap
    )} / 2) 110%)`,
  };

  const buttonProps = {
    animate: true,
    shadow: true,
    rounded: theme.border.radius.full,
    bg: theme.colors.background[5],
    padding: theme.spacing[1],
  };

  const buttonBoxProps = {
    absolute: true,
    top: `calc(50% - ${theme.spacing[2]})`,
  };

  const GroupsMarkup = chunks.map((chunk, index) => (
    <Flex key={index} style={{ width }}>
      {chunk}
    </Flex>
  ));

  const SliderMarkup = (
    <Slider state={state} groups={chunks.length}>
      <Flex style={{ width }}>{chunks[chunks.length - 1]}</Flex>
      {GroupsMarkup}
      <Flex style={{ width }}>{chunks[0]}</Flex>
    </Slider>
  );

  const ExtendLeftMarkup = (
    <Box left={theme.spacing[1.5]} {...buttonBoxProps}>
      <Button onClick={prev} {...buttonProps}>
        <Icon src={ExtendLeft} w={theme.icon.base} />
      </Button>
    </Box>
  );

  const ExtendRightMarkup = (
    <Box right={theme.spacing[1.5]} {...buttonBoxProps}>
      <Button onClick={next} {...buttonProps}>
        <Icon src={ExtendRight} w={theme.icon.base} />
      </Button>
    </Box>
  );

  return (
    <CarouselContext.Provider value={{ gap, groups }}>
      <Box margin={[theme.spacing[0], `calc(${Negative(gap)} / 2)`]}>
        <Box ref={mask} css={maskStyle} w={1}>
          {SliderMarkup}
          {ExtendLeftMarkup}
          {ExtendRightMarkup}
        </Box>
      </Box>
    </CarouselContext.Provider>
  );
}

export const Carousel = Object.assign(CarouselBase, {
  Slide,
  displayName: "Carousel",
});
