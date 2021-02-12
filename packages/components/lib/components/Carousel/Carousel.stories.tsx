import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { AppProvider } from "@lib/components/AppProvider";
import { Image } from "@lib/components/Image";

import { Carousel, CarouselProps } from "./Carousel";

export default {
  title: "Carousel",
  component: Carousel,
} as Meta;

export const Example: Story<CarouselProps> = () => (
  <AppProvider theme="dark">
    <Carousel groups={6} gap="1rem">
      {[...Array(24)].map((_, index) => (
        <Carousel.Slide key={index}>
          <Image src="" aspectRatio={2} />
        </Carousel.Slide>
      ))}
    </Carousel>
  </AppProvider>
);
