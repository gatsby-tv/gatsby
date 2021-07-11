import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { useVolatileState } from '@gatsby-tv/utilities';

import { Button } from '@lib/components/Button';
import { Fireworks, FireworksProps } from '@lib/components/Fireworks';

export default {
  title: 'Fireworks',
  component: Fireworks,
} as Meta;

export const Infinite: Story<FireworksProps> = () => {
  return <Fireworks foreground />;
};

export const WithButton: Story<FireworksProps> = () => {
  const [toggle, setToggle] = useVolatileState();

  const origin = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };

  return (
    <>
      <Button onClick={setToggle}>Fire</Button>
      <Fireworks
        origin={origin}
        toggle={toggle}
        count={5}
        interval={100}
        background
      />
    </>
  );
};
