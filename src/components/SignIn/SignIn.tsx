import React from 'react';
import { signIn } from 'next-auth/client';
import {
  Button,
  Form,
  FormFieldProps,
  Fireworks,
  Icon,
  Modal,
  ModalProps,
  Rule,
  TextDisplay,
} from '@gatsby-tv/components';
import { GatsbyPlain, Google, Email } from '@gatsby-tv/icons';

import styles from './SignIn.module.scss';

export type SignInProps = Omit<ModalProps, 'overlay' | 'zIndex'>;

let emailValue: string = '';

function emailSignIn(event: React.FormEvent) {
  const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailValue })
    };
    try {
      fetch('http://localhost:3001/v1/auth/signin', requestOptions)
          .then(response => response.json())
          .then(data => console.log('fuck it heres the session key ' + JSON.stringify(data)));
    } catch (err) {
      console.log(err);
    }

    // We don't need the page to reload.
    event.preventDefault();
}


function fieldChangeHandler(value: string, id?: string, setError?: (id: string, message: string) => void, clearError?: (id: string) => void) {
  console.log('value: ' + value + ' id: ' + id);
  emailValue = value;
}

export function SignIn(props: SignInProps): React.ReactElement {
  return (
    <Modal
      id="sign-in"
      className={styles.Modal}
      overlay
      zIndex={100}
      {...props}
    >
      <div className={styles.Title}>
        <Icon src={GatsbyPlain} size="largest" />
        <TextDisplay size="small">Sign In to Gatsby</TextDisplay>
      </div>
      <Rule className={styles.Rule} spacing="loose" />
      <div className={styles.Options}>
        <Button className={styles.Option} onClick={() => signIn('google')}>
          <Icon src={Google} />
          Sign In with Google
        </Button>
      </div>
      <Rule className={styles.Rule} spacing="loose">
        Or
      </Rule>
      <Form onSubmit={emailSignIn}>
        <Form.Field
          id="email"
          type="text"
          className={styles.Email}
          name="email"
          placeholder="Email"
          prefix={<Icon src={Email} size="smaller" />}
	  onChange={fieldChangeHandler}
          autoComplete
        />
        <Button
	  type="submit"
          className={styles.Submit}
        >
          Sign In
        </Button>
      </Form>
      <Fireworks infinite zIndex={50} />
    </Modal>
  );
}
