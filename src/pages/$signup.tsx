import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
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
import { Validators } from '@gatsby-tv/utilities';
import { PostAuthCompleteSignUpResponse } from '@gatsby-tv/types';

import { PageBody } from '@src/components/PageBody';
import { useSession } from '@src/utilities/session';
import { fetcher } from '@src/utilities/fetcher';
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

  const onSubmit = useCallback(
    (form) => {
      setLoading(true);
      fetcher<PostAuthCompleteSignUpResponse>(`/user`, undefined, {
        method: 'POST',
        body: { key, ...form },
      }).then((resp) => setSession(resp.token));
    },
    [key]
  );

  const HeaderMarkup = (
    <Head>
      <title>Sign Up to Gatsby</title>
    </Head>
  );

  const FormMarkup = (
    <Form id="sign-up" onSubmit={onSubmit}>
      <div className={styles.Form}>
        <div className={styles.Fields}>
          <Form.Label className={styles.Label} for="name" label="Display Name">
            <Form.Field
              id="name"
              type="text"
              value={name}
              className={styles.Field}
              autoFocus
              validators={[
                Validators.required('Display name is required'),
                Validators.maxLength(
                  50,
                  'Display name cannot be longer than 50 characters'
                ),
              ]}
              onChange={setName}
            />
          </Form.Label>
          <Form.Label className={styles.Label} for="handle" label="Handle">
            <Form.Field
              id="handle"
              type="text"
              value={handle}
              className={styles.Field}
              prefix="@"
              validators={[
                Validators.required('Handle is required'),
                Validators.pattern(
                  /^[a-zA-Z0-9_]+$/,
                  'Handles can only consist of letters, numbers, and underscores'
                ),
                Validators.minLength(
                  4,
                  'Handle must be at least 4 characters long'
                ),
                Validators.maxLength(
                  20,
                  'Handle cannot be longer than 20 characters'
                ),
              ]}
              onChange={setHandle}
            />
          </Form.Label>
        </div>
        <Button type="submit" className={styles.Submit}>
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
    <>
      {HeaderMarkup}
      <PageBody className={styles.Page}>
        <TextDisplay className={styles.Heading} size="large">
          Welcome to Gatsby!
        </TextDisplay>
        <div className={styles.Card}>
          {loading ? LoadingMarkup : FormMarkup}
        </div>
        <Fireworks infinite background />
      </PageBody>
    </>
  );
}
