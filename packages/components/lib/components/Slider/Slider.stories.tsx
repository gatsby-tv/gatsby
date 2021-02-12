import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { AppProvider } from "@lib/components/AppProvider";
import { Image } from "@lib/components/Image";

import { Slider, SliderProps } from "./Slider";

export default {
  title: "Slider",
  component: Slider,
} as Meta;

export const Example: Story<SliderProps> = () => (
  <AppProvider theme="dark">
    <Slider groups={5} gap="16px">
      {[...Array(18)].map((_, index) => (
        <Image key={index} src="" aspectRatio={0.5625} />
      ))}
    </Slider>
  </AppProvider>
);
