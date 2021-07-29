import React, { useState, useCallback } from 'react';
import { Button, Form } from '@gatsby-tv/components';
import { Filters, useUniqueId, useSnackBar } from '@gatsby-tv/utilities';
import { User, PutUserResponse } from '@gatsby-tv/types';

import { Response } from '@src/components/Response';
import { fetcher } from '@src/utilities/fetcher';
import { isHandle, isDisplayName } from '@src/utilities/validators';

import styles from './Fields.module.scss';

export interface FieldsProps {
  user: User;
  token: string;
}

export function Fields(props: FieldsProps): React.ReactElement {
  const { user, token } = props;
  const id = useUniqueId('user');
  const [, setSnack] = useSnackBar();
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [description, setDescription] = useState(user.description);

  const disabled = !(name || handle) && description === user.description;

  const onSubmit = useCallback(
    (form) => {
      const promise = fetcher<PutUserResponse>(`/user/${user._id}`, token, {
        method: 'PUT',
        body: form,
      }).then(Response({ success: 'Profile updated' }));

      setSnack({ content: promise, duration: 2000 });
    },
    [user, token]
  );

  return (
    <Form
      id={id}
      filters={[Filters.empty('name', 'handle')]}
      onSubmit={onSubmit}
    >
      <div className={styles.Fields}>
        <Form.Label className={styles.Label} for="name" label="Display Name">
          <Form.Field
            id="name"
            type="text"
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
          className={styles.TextArea}
          multiline
          value={description}
          onChange={setDescription}
        />
      </Form.Label>
      <Button className={styles.Submit} type="submit" disabled={disabled}>
        Submit
      </Button>
    </Form>
  );
}
