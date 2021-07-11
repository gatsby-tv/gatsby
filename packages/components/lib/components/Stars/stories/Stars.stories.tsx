import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Stars, StarsProps } from '@lib/components/Stars';

export default {
  title: 'Stars',
  component: Stars,
} as Meta;

export const Example: Story<StarsProps> = (props) => {
  return <Stars background {...props} />;
};

Example.args = {
  density: 100,
};
