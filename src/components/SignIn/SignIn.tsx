import React from 'react';
import { signIn } from 'next-auth/client';
import {
  Button,
  Form,
  FormField,
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
      <Form method="post" action="/api/auth/signin/email">
        <FormField
          id="email"
          type="text"
          className={styles.Email}
          name="email"
          label="Email"
          labelHidden
          placeholder="Email"
          prefix={<Icon src={Email} size="smaller" />}
          autoComplete
        />
        <Button
          type="submit"
          className={styles.Submit}
          onClick={() => signIn('credentials')}
        >
          Sign In
        </Button>
      </Form>
      <Fireworks infinite zIndex={50} />
    </Modal>
  );
}
