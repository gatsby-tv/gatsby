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

import { sessionKey } from '@src/components/SignIn';

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

  let handleValue: string = '';
  let nameValue: string = '';
  // localhost:3001/v1/auth/session/:sessionkey
  const sendSignUp = function (event: React.FormEvent) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ handle: handleValue, name: nameValue }),
    };
    try {
      const requestUrl = 'http://localhost:3001/v1/auth/session/' + sessionKey;
      console.log('requestUrl :', requestUrl);
      fetch(requestUrl, requestOptions)
        .then((response) => response.json())
        .then(data => console.log('JWT: ' + JSON.stringify(data)));// TODO store JWT
    } catch (err) {
      console.log(err);
    }

    // We don't need the page to reload.
    event.preventDefault();
  };
  const channelNameChanged = function(value: string, id?: string, setError?: (id: string, message: string) => void, clearError?: (id: string) => void) {
    nameValue = value;
  }
  const displayNameChanged = function(value: string, id?: string, setError?: (id: string, message: string) => void, clearError?: (id: string) => void) {
    handleValue = value;
  }

  const FormMarkup = (
    <Form className={styles.Form} onSubmit={sendSignUp}>
      <Form.Field type="text" {...emailProps} className={styles.Field} />
      <Form.Field type="text" onChange={channelNameChanged} {...channelNameProps} className={styles.Field} />
      <Form.Field type="text" onChange={displayNameChanged} {...displayNameProps} className={styles.Field} />

      <Button
        type="submit"
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
