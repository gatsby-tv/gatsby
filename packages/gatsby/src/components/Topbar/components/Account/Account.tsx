import React from "react";
import { signOut, useSession } from "next-auth/client";
import { Avatar, Icon, Button, Rule, Menu } from "@gatsby-tv/components";
import { User as UserIcon, Exit } from "@gatsby-tv/icons";
import { useMenu, useModal } from "@gatsby-tv/utilities";
import { User } from "@gatsby-tv/types";

import { SignIn } from "@src/components/SignIn";

import { Skeleton } from "./Account.skeleton";
import styles from "./Account.module.scss";

export function Account(): React.ReactElement {
  const [session, loading] = useSession();
  const menu = useMenu<HTMLButtonElement>();
  const modal = useModal();
  const user = session?.user as User | undefined;

  if (loading) return <Skeleton />;

  return user ? (
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
        <Menu.Link icon={UserIcon} href={`/u/${user.handle}/settings`}>
          Settings
        </Menu.Link>
        <Rule spacing="none" />
        <Menu.Item icon={Exit} onClick={signOut}>
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
