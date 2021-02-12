import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { useToggle } from "@gatsby-tv/utilities";

import { AppProvider } from "@lib/components/AppProvider";
import { Button } from "@lib/components/Button";

import { Fireworks, FireworksProps } from "./Fireworks";

export default {
  title: "Fireworks",
  component: Fireworks,
} as Meta;

export const Infinite: Story<FireworksProps> = () => {
  return (
    <AppProvider theme="dark">
      <Fireworks infinite />
    </AppProvider>
  );
};

export const WithButton: Story<FireworksProps> = () => {
  const [toggle, flipToggle] = useToggle();
  const buttonMarkup = <Button onClick={flipToggle}>Fire</Button>;
  const origin = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };

  return (
    <AppProvider theme="dark">
      <Fireworks
        origin={origin}
        activator={buttonMarkup}
        toggle={toggle}
        count={5}
        interval={100}
      />
    </AppProvider>
  );
};
