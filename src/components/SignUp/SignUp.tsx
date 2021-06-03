import React from 'react';
import {
  Button,
  Form,
  Fireworks,
  Icon,
  ModalProps,
  TextDisplay,
} from '@gatsby-tv/components';
import { GatsbyPlain } from '@gatsby-tv/icons';

import styles from './SignUp.module.scss';

export function SignUp(): React.ReactElement {
  const emailProps = {
    id: 'email',
    name: 'email',
    label: 'Email',
    labelHidden: true,
    placeholder: 'Email',
    spellCheck: false,
    autoComplete: true,
  };

  const channelNameProps = {
    id: 'channel',
    name: 'channel',
    label: 'Channel Name',
    labelHidden: true,
    placeholder: 'Channel Name',
    spellCheck: false,
    autoComplete: false,
  };

  const displayNameProps = {
    id: 'display',
    name: 'display',
    label: 'Display Name',
    labelHidden: true,
    placeholder: 'Display Name',
    spellCheck: false,
    autoComplete: false,
  };

  const TitleMarkup = (
    <div className={styles.Title}>
      <Icon src={GatsbyPlain} size="largest" />
      <TextDisplay size="small">Sign Up for Gatsby</TextDisplay>
    </div>
  );

  const sendSignUp = function (event: React.FormEvent) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'emailValue' }),
    };
    try {
      fetch('http://localhost:3001/v1/auth/signin', requestOptions)
        .then((response) => response.json())
        .then((data) =>
          console.log('fuck it heres the session key ' + JSON.stringify(data))
        );
    } catch (err) {
      console.log(err);
    }

    // We don't need the page to reload.
    event.preventDefault();
  };

  const FormMarkup = (
    <Form className={styles.Form} onSubmit={sendSignUp}>
      <Form.Field type="text" {...emailProps} className={styles.Field} />
      <Form.Field type="text" {...channelNameProps} className={styles.Field} />
      <Form.Field type="text" {...displayNameProps} className={styles.Field} />

      <Button
        type="submit"
        onClick={() => alert('This has not been set up yet.')}
        className={styles.Submit}
      >
        Submit
      </Button>
    </Form>
  );

  return (
    <>
      <div className={styles.Card}>
        {TitleMarkup}
        {FormMarkup}
      </div>
      <Fireworks infinite zIndex={-1} />
    </>
  );
}
