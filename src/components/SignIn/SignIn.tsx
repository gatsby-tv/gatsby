import React, { useState, useCallback } from 'react';
import {
  Button,
  Form,
  Icon,
  Modal,
  ModalProps,
  Rule,
  TextDisplay,
} from '@gatsby-tv/components';
import { GatsbyPlain, Google, Email } from '@gatsby-tv/icons';
import { Validators } from '@gatsby-tv/utilities';

import styles from './SignIn.module.scss';

export type SignInProps = Omit<ModalProps, 'overlay' | 'zIndex'>;

export function SignIn(props: SignInProps): React.ReactElement {
  const [email, setEmail] = useState('');

  return (
    <Modal className={styles.Modal} overlay {...props}>
      <div className={styles.Title}>
        <Icon src={GatsbyPlain} size="largest" />
        <TextDisplay size="small">Sign In to Gatsby</TextDisplay>
      </div>
      <Rule className={styles.Rule} spacing="loose" />
      <div className={styles.Options}>
        <Button className={styles.Option}>
          <Icon src={Google} />
          Sign In with Google
        </Button>
      </div>
      <Rule className={styles.Rule} spacing="loose">
        Or
      </Rule>
      <Form id="sign-in">
        <Form.Field
          id="email"
          type="text"
          value={email}
          className={styles.Email}
          placeholder="Email"
          prefix={<Icon src={Email} size="smaller" />}
          validators={[Validators.isEmail('Invalid email')]}
          onChange={setEmail}
          autoComplete
        />
        <Button type="submit" className={styles.Submit}>
          Sign In
        </Button>
      </Form>
    </Modal>
  );
}
