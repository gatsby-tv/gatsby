import { useState, useCallback } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Play, Pause } from '@gatsby-tv/icons';
import { Exists } from '@gatsby-tv/utilities';

import { Icon } from '@lib/components/Icon';
import { Button, ButtonProps } from '@lib/components/Button';

import styles from './Button.stories.scss';

export default {
  title: 'Button',
  component: Button,
} as Meta;

type TextButtonProps = ButtonProps & {
  solid: boolean;
};

const Template: Story<TextButtonProps> = ({ solid, ...props }) => (
  <Button className={Exists(solid, styles.TextButton)} {...props} />
);

export const TextButton = Template.bind({});
TextButton.args = {
  children: 'ClickMe',
  animate: true,
  waiting: false,
  solid: false,
  onClick: () => console.log('Click'),
};

export const IconButton = Template.bind({});
IconButton.args = {
  icon: Pause,
  animate: true,
  onClick: () => console.log('Click'),
};
