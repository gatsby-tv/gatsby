import React, { useState, useCallback } from 'react';
import {
  Button,
  Form,
  Icon,
  Staging,
  Modal,
  ModalProps,
  Rule,
  TextBox,
  TextDisplay,
} from '@gatsby-tv/components';
import {
  GatsbyPlain,
  Google,
  Email,
  CheckmarkFill,
  CancelFill,
} from '@gatsby-tv/icons';
import { classNames, Validators } from '@gatsby-tv/utilities';
import { PostAuthSignInResponse } from '@gatsby-tv/types';

import { fetcher } from '@src/utilities/fetcher';

import styles from './SignIn.module.scss';

export type SignInProps = Omit<ModalProps, 'overlay' | 'zIndex'>;

export function SignIn(props: SignInProps): React.ReactElement {
  const [email, setEmail] = useState('');
  const [stage, setStage] = useState(0);
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback((form) => {
    setLoading(true);
    fetcher<PostAuthSignInResponse>('/auth/signin', undefined, {
      method: 'POST',
      body: form,
    }).then((resp) => {
      setValid(resp.ok);
      setStage(1);
    });
  }, []);

  const ConfirmationMarkup = valid ? (
    <>
      <span>
        <Icon src={Email} className={styles.EmailIcon} />
        <Icon
          className={classNames(styles.EmailDecorator, styles.Valid)}
          src={CheckmarkFill}
        />
      </span>
      <TextDisplay>Email Sent!</TextDisplay>
      <TextBox className={styles.SemiBold}>
        (We don't do passwords here)
      </TextBox>
    </>
  ) : (
    <>
      <span>
        <Icon src={Email} className={styles.EmailIcon} />
        <Icon
          className={classNames(styles.EmailDecorator, styles.Invalid)}
          src={CancelFill}
        />
      </span>
      <TextDisplay>Unable to Send Email</TextDisplay>
      <TextBox className={styles.SemiBold}>
        There was a problem with our backend...
      </TextBox>
    </>
  );

  return (
    <Modal className={styles.Modal} overlay {...props}>
      <Staging stage={stage}>
        <Staging.Stage index={0}>
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
          <Form id="sign-in" onSubmit={onSubmit}>
            <Form.Field
              id="email"
              type="email"
              value={email}
              className={styles.Email}
              placeholder="Email"
              prefix={<Icon src={Email} size="smaller" />}
              validators={[Validators.isEmail('Invalid email')]}
              onChange={setEmail}
              autoComplete
            />
            <Button type="submit" className={styles.Submit} waiting={loading}>
              Sign In
            </Button>
          </Form>
        </Staging.Stage>
        <Staging.Stage className={styles.Confirmation} index={1}>
          {ConfirmationMarkup}
        </Staging.Stage>
      </Staging>
    </Modal>
  );
}
