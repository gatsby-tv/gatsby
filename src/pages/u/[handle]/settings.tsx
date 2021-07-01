import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  Avatar,
  Activatable,
  Button,
  Icon,
  Optional,
  Form,
  TextDisplay,
  TextMeta,
  TextBox,
} from '@gatsby-tv/components';
import { Image } from '@gatsby-tv/icons';
import {
  UserHandle,
  FullValue,
  Filters,
  useFrame,
  useModal,
} from '@gatsby-tv/utilities';
import { PutUserResponse, PutUserAvatarResponse } from '@gatsby-tv/types';

import { Page } from '@src/components/Page';
import { AvatarCrop } from '@src/components/AvatarCrop';
import { useSession } from '@src/utilities/session';
import { fetcher } from '@src/utilities/fetcher';
import { isHandle, isDisplayName } from '@src/utilities/validators';

import styles from '@src/styles/UserSettings.module.scss';

export default function UserSettings(): React.ReactElement {
  const router = useRouter();
  const { screen } = useFrame();
  const [{ user, ...session }] = useSession();
  const [hover, setHover] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [description, setDescription] = useState(user?.description ?? '');

  useEffect(() => {
    if (!user) return;
    setDescription(user.description);
  }, [user]);

  const onAvatarSubmit = useCallback(
    (avatar) => {
      if (!user) return;
      setFile(null);
      const body = new FormData();
      body.append('avatar', avatar);
      fetcher<PutUserAvatarResponse>(`/user/${user._id}/avatar`, session.token, {
        method: 'PUT',
        body
      });
    },
    [user, session.token]
  );

  const onSubmit = useCallback(
    (form) => {
      if (!user) return;
      const { name, handle, description } = user;

      fetcher<PutUserResponse>(`/user/${user._id}`, session.token, {
        method: 'PUT',
        body: { user, handle, description, ...form },
      });
    },
    [user, session.token]
  );

  if (!session.token) {
    router.push('/');
  }

  const AvatarOverlayMarkup = (
    <>
      <Activatable
        className={styles.OverlayTint}
        active={hover}
        duration="fastest"
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
      >
        <TextDisplay className={styles.OverlayText} size="small">
          Change Avatar
        </TextDisplay>
      </Activatable>
      <Icon className={styles.OverlayImage} src={Image} size="small" />
    </>
  );

  if (!user || !session.valid) {
    return (
      <Page title="Settings">
        <Page.Loading />
      </Page>
    );
  }

  return (
    <Page title="Settings">
      <Page.Body narrow>
        <div className={styles.Header}>
          <Form id="update-avatar">
            <Form.File id="avatar" value={file} onChange={setFile}>
              <Avatar
                className={styles.Avatar}
                src={user.avatar}
                overlay={AvatarOverlayMarkup}
              />
            </Form.File>
            <AvatarCrop
              file={file}
              onExit={() => setFile(null)}
              onSubmit={onAvatarSubmit}
            />
          </Form>
          <div className={styles.Info}>
            <TextDisplay
              className={styles.HeaderTitle}
              size={screen.width > 650 ? 'large' : 'medium'}
            >
              {user.name}
            </TextDisplay>
            <TextMeta.List className={styles.HeaderInfo}>
              <TextMeta>{UserHandle(user.handle)}</TextMeta>
              <TextMeta>{FullValue(user.followers, 'follower')}</TextMeta>
            </TextMeta.List>
          </div>
        </div>
        <Form
          id="update-user"
          className={styles.Form}
          filters={[Filters.empty('name', 'handle')]}
          onSubmit={onSubmit}
        >
          <div className={styles.NameFields}>
            <Form.Label
              className={styles.Label}
              for="name"
              label="Display Name"
            >
              <Form.Field
                id="name"
                type="text"
                className={styles.NameField}
                placeholder={user.name}
                value={name}
                onChange={setName}
                validators={isDisplayName()}
              />
            </Form.Label>
            <Form.Label className={styles.Label} for="handle" label="Handle">
              <Form.Field
                id="handle"
                type="text"
                className={styles.NameField}
                placeholder={user.handle}
                prefix="@"
                value={handle}
                onChange={setHandle}
                validators={isHandle()}
              />
            </Form.Label>
          </div>
          <Form.Label
            className={styles.Label}
            for="description"
            label="Description"
          >
            <Form.Field
              id="description"
              type="text"
              className={styles.Description}
              multiline
              value={description}
              onChange={setDescription}
            />
          </Form.Label>
          <Button
            className={styles.Submit}
            type="submit"
            disabled={!(name || handle) && description === user.description}
          >
            Submit
          </Button>
        </Form>
      </Page.Body>
    </Page>
  );
}
