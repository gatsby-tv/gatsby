import React, { useCallback } from 'react';
import { Button, Form } from '@gatsby-tv/components';
import {
  useUniqueId,
  useSnackBar,
  useChangeSet,
} from '@gatsby-tv/utilities';
import { User, PutUserResponse } from '@gatsby-tv/types';

import { Response } from '@src/components/Response';
import { fetcher } from '@src/utilities/fetcher';
import { useSession } from '@src/utilities/session';
import { isHandle, isDisplayName } from '@src/utilities/validators';

import styles from './Fields.module.scss';

export interface FieldsProps {
  user: User;
  token: string;
}

export function Fields(props: FieldsProps): React.ReactElement {
  const { user, token } = props;
  const id = useUniqueId('user');
  const { mutate } = useSession();
  const [, setSnack] = useSnackBar();

  const { pristine, updates, values, setValue } = useChangeSet(
    {
      name: '',
      handle: '',
      description: user.description,
    },
    [user.description, token]
  );

  const onSubmit = useCallback(
    () => {
      const promise = fetcher<PutUserResponse>(`/user/${user._id}`, token, {
        method: 'PUT',
        body: updates,
      })
        .then(mutate)
        .then(Response({ success: 'Profile updated' }));

      setSnack({ content: promise, duration: 2000 });
    },
    [updates, user, token]
  );

  return (
    <Form id={id} onSubmit={onSubmit}>
      <div className={styles.Fields}>
        <Form.Label className={styles.Label} for="name" label="Display Name">
          <Form.Field
            id="name"
            type="text"
            placeholder={user.name}
            value={values.name as string}
            onChange={setValue}
            validators={isDisplayName}
          />
        </Form.Label>
        <Form.Label className={styles.Label} for="handle" label="Handle">
          <Form.Field
            id="handle"
            type="text"
            prefix="@"
            placeholder={user.handle}
            value={values.handle as string}
            onChange={setValue}
            validators={isHandle}
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
          className={styles.TextArea}
          multiline
          placeholder={user.description}
          value={values.description as string}
          onChange={setValue}
        />
      </Form.Label>
      <Button className={styles.Submit} type="submit" disabled={pristine}>
        Submit
      </Button>
    </Form>
  );
}
