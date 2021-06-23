import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Button } from '@lib/components/Button';
import { Fireworks, FireworksProps } from '@lib/components/Fireworks';

export default {
  title: 'Fireworks',
  component: Fireworks,
} as Meta;

export const Infinite: Story<FireworksProps> = () => {
  return <Fireworks infinite />;
};

export const WithButton: Story<FireworksProps> = () => {
  const [toggle, setToggle] = useState<boolean | undefined>(undefined);

  const ButtonMarkup = (
    <Button onClick={() => setToggle((current) => !current)}>Fire</Button>
  );

  const origin = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };

  return (
    <Fireworks
      origin={origin}
      activator={ButtonMarkup}
      toggle={toggle}
      count={5}
      interval={100}
    />
  );
};
