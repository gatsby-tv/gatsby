import React from 'react';
import { Avatar, Icon, Button, Rule, Menu } from '@gatsby-tv/components';
import { User as UserIcon, Exit } from '@gatsby-tv/icons';
import { useMenu, useModal } from '@gatsby-tv/utilities';
import { User } from '@gatsby-tv/types';

import { Link } from '@src/components/Link';
import { SignIn } from '@src/components/SignIn';
import { useSession } from '@src/utilities/session';

import { Skeleton } from './Account.skeleton';
import styles from './Account.module.scss';

export function Account(): React.ReactElement {
  const [session, setSession] = useSession();
  const menu = useMenu<HTMLButtonElement>();
  const modal = useModal();
  const user = session?.user as User | undefined;

  if (!session.valid && session.loading) return <Skeleton />;

  return session.valid && user ? (
    <>
      <Button ref={menu.ref} className={styles.Avatar} onClick={menu.toggle}>
        <Avatar src={user.avatar} size="smaller" />
      </Button>
      <Menu
        for={menu.ref}
        className={styles.Menu}
        itemClass={styles.MenuItem}
        placement="bottom-end"
        offset={[0, 7]}
        active={menu.active}
        onExit={menu.deactivate}
      >
        <Link
          component={Menu.Link}
          href={`/u/${user.handle}/settings`}
          $props={{ icon: UserIcon }}
        >
          Settings
        </Link>
        <Rule spacing="none" />
        <Menu.Item icon={Exit} onClick={() => setSession(undefined)}>
          Sign Out
        </Menu.Item>
      </Menu>
    </>
  ) : (
    <>
      <Button className={styles.SignIn} onClick={modal.activate}>
        Sign In
      </Button>
      <Button className={styles.Misc} animate icon={UserIcon} size="small" />
      <SignIn active={modal.active} onExit={modal.deactivate} />
    </>
  );
}
