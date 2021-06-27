import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  Avatar,
  Button,
  Icon,
  Optional,
  Form,
  TextDisplay,
  TextMeta,
} from '@gatsby-tv/components';
import { CheckmarkFill } from '@gatsby-tv/icons';
import { UserHandle, FullValue, Filters, useFrame } from '@gatsby-tv/utilities';
import { pick, PutUserResponse } from '@gatsby-tv/types';

import { Page } from '@src/components/Page';
import { useSession } from '@src/utilities/session';
import { fetcher } from '@src/utilities/fetcher';
import { isHandle, isDisplayName } from '@src/utilities/validators';

import styles from '@src/styles/UserSettings.module.scss';

export default function UserSettings(): React.ReactElement {
  const router = useRouter();
  const { screen } = useFrame();
  const [{ user, ...session }] = useSession();
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [description, setDescription] = useState(user?.description ?? '');

  useEffect(() => {
    if (!user) return;
    setDescription(user.description)
  }, [user]);

  const onSubmit = useCallback(
    (form) => {
      if (!user) return;

      fetcher<PutUserResponse>(`/user/${user._id}`, session.token, {
        method: 'PUT',
        body: {
          ...pick(user as unknown as Record<string, unknown>, [
            'name',
            'handle',
            'description',
          ]),
          ...form,
        },
      });
    },
    [user, session.token]
  );

  if (!session.token) {
    router.push('/');
  }

  if (!user || !session.valid) {
    return (
      <Page title="Settings">
        <Page.Loading />
      </Page>
    );
  }

  const invalid =
    !(name || handle) && description === user.description;

  return (
    <Page title="Settings">
      <Page.Body narrow>
        <div className={styles.Header}>
          <Avatar className={styles.Avatar} src={user.avatar} />
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
          <Button className={styles.Submit} type="submit" disabled={invalid}>
            Submit
          </Button>
        </Form>
      </Page.Body>
    </Page>
  );
}
