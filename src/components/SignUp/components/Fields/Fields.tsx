import React, { useState, useCallback } from 'react';
import { Button, Form, Icon } from '@gatsby-tv/components';
import { Spinner } from '@gatsby-tv/icons';
import { Class, Validators, useUniqueId } from '@gatsby-tv/utilities';
import { PostAuthCompleteSignUpResponse } from '@gatsby-tv/types';

import { useSession } from '@src/utilities/session';
import { fetcher } from '@src/utilities/fetcher';
import { isHandle, isDisplayName } from '@src/utilities/validators';

import styles from './Fields.module.scss';

export interface FieldsProps {
  code: string;
}

export function Fields(props: FieldsProps): React.ReactElement {
  const { code } = props;
  const id = useUniqueId('signup');
  const [, setSession] = useSession();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');

  const onSubmit = useCallback(
    (form) => {
      setLoading(true);
      fetcher<PostAuthCompleteSignUpResponse>(`/user`, undefined, {
        method: 'POST',
        body: { key: code, ...form },
      })
        .then((resp) => resp.json())
        .then((resp) => setSession((resp as { token: string }).token));
    },
    [code]
  );

  if (loading) {
    return (
      <div className={Class(styles.Card, styles.Loading)}>
        <Icon className={styles.Spinner} src={Spinner} />
      </div>
    );
  }

  return (
    <Form
      id={id}
      className={Class(styles.Card, styles.Form)}
      onSubmit={onSubmit}
    >
      <div className={styles.Fields}>
        <Form.Label className={styles.Label} for="name" label="Display Name">
          <Form.Field
            id="name"
            type="text"
            className={styles.Field}
            autoFocus
            value={name}
            onChange={setName}
            validators={[
              Validators.required('Display name is required'),
              ...isDisplayName(),
            ]}
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
            validators={[
              Validators.required('Handle is required'),
              ...isHandle(),
            ]}
          />
        </Form.Label>
      </div>
      <Button className={styles.Submit} type="submit">
        Sign Up
      </Button>
    </Form>
  );
}
