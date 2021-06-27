import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  Form,
  Icon,
  Fireworks,
  Rule,
  TextDisplay,
} from '@gatsby-tv/components';
import { Spinner } from '@gatsby-tv/icons';
import {
  PostAuthPersistSignInKeyResponse,
  PostAuthCompleteSignUpResponse,
} from '@gatsby-tv/types';

import { Page } from '@src/components/Page';
import { useSession } from '@src/utilities/session';
import { fetcher } from '@src/utilities/fetcher';
import { isHandle, isDisplayName } from '@src/utilities/validators';

import styles from '@src/styles/SignUp.module.scss';

export default function SignUpPage(): React.ReactElement {
  const router = useRouter();
  const { key } = router.query;
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [session, setSession] = useSession();

  useEffect(() => {
    if (session.valid) router.push('/');
  }, [session.valid]);

  useEffect(() => {
    fetcher<PostAuthPersistSignInKeyResponse>(
      `/auth/signin/${key}/persist`,
      undefined,
      {
        method: 'POST',
      }
    );
  }, []);

  const onSubmit = useCallback(
    (form) => {
      setLoading(true);
      fetcher<PostAuthCompleteSignUpResponse>(`/user`, undefined, {
        method: 'POST',
        body: { key, ...form },
      })
        .then((resp) => resp.json())
        .then((resp) => setSession((resp as { token: string }).token));
    },
    [key]
  );

  const FormMarkup = (
    <Form id="sign-up" onSubmit={onSubmit}>
      <div className={styles.Form}>
        <div className={styles.Fields}>
          <Form.Label className={styles.Label} for="name" label="Display Name">
            <Form.Field
              id="name"
              type="text"
              className={styles.Field}
              autoFocus
              value={name}
              onChange={setName}
              validators={isDisplayName({ required: true })}
            />
          </Form.Label>
          <Form.Label className={styles.Label} for="handle" label="Handle">
            <Form.Field
              id="handle"
              type="text"
              className={styles.Field}
              prefix="@"
              value={handle}
              onChange={setHandle}
              validators={isHandle({ required: true })}
            />
          </Form.Label>
        </div>
        <Button className={styles.Submit} type="submit">
          Sign Up
        </Button>
      </div>
    </Form>
  );

  const LoadingMarkup = (
    <div className={styles.Loading}>
      <Icon className={styles.Spinner} src={Spinner} />
    </div>
  );

  return (
    <Page title="Sign Up to Gatsby">
      <Page.Body className={styles.Page}>
        <TextDisplay className={styles.Heading} size="large">
          Welcome to Gatsby!
        </TextDisplay>
        <div className={styles.Card}>
          {loading ? LoadingMarkup : FormMarkup}
        </div>
        <Fireworks infinite background />
      </Page.Body>
    </Page>
  );
}
