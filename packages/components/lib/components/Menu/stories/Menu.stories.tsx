import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { useMenu } from '@gatsby-tv/utilities';
import { Gear } from '@gatsby-tv/icons';

import { Button } from '@lib/components/Button';
import { Icon } from '@lib/components/Icon';
import { TextBox } from '@lib/components/TextBox';
import { Rule } from '@lib/components/Rule';
import { Menu, MenuProps } from '@lib/components/Menu';

import styles from './Menu.stories.scss';

export default {
  title: 'Menu',
  component: Menu,
} as Meta;

export const Example: Story<MenuProps> = () => {
  const menu = useMenu();

  return (
    <>
      <Button ref={menu.ref} animate icon={Gear} onClick={menu.toggle} />
      <Menu
        className={styles.Menu}
        itemClass={styles.Item}
        for={menu.ref}
        placement="bottom-start"
        active={menu.active}
        onExit={menu.deactivate}
      >
        <Menu.Item>
          <TextBox>One</TextBox>
        </Menu.Item>
        <Menu.Item>
          <TextBox>Two</TextBox>
        </Menu.Item>
        <Rule thin />
        <Menu.Item>
          <TextBox>Three</TextBox>
        </Menu.Item>
        <Menu.Item>
          <TextBox>Four</TextBox>
        </Menu.Item>
      </Menu>
    </>
  );
};
