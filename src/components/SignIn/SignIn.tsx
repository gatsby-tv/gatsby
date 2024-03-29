import { useState, useCallback, ReactElement } from 'react';
import {
  Button,
  Form,
  Icon,
  Staging,
  Panel,
  Modal,
  ModalProps,
  Rule,
  TextBox,
  TextDisplay,
} from '@gatsby-tv/components';
import {
  GatsbyPlain,
  // Google,
  Cancel,
  Email,
  CheckmarkFill,
  CancelFill,
} from '@gatsby-tv/icons';
import { Class, Validators, useMobileDetector } from '@gatsby-tv/utilities';
import { PostAuthSignInResponse } from '@gatsby-tv/types';

import { fetcher } from '@src/utilities/fetcher';

import styles from './SignIn.module.scss';

export type SignInProps = Omit<ModalProps, 'overlay' | 'zIndex'>;

export function SignIn(props: SignInProps): ReactElement {
  const [email, setEmail] = useState('');
  const [stage, setStage] = useState(0);
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const isMobile = useMobileDetector();

  const Container = isMobile ? Panel : Modal;

  const onSubmit = useCallback((form: Record<string, unknown>) => {
    setLoading(true);
    fetcher<PostAuthSignInResponse>('/auth/signin', {
      method: 'POST',
      body: form,
    })
      .catch((resp) => resp)
      .then((resp) => {
        setValid(resp.ok);
        setStage(1);
      });
  }, []);

  const ConfirmationMarkup = valid ? (
    <>
      <span>
        <Icon src={Email} className={styles.EmailIcon} />
        <Icon
          className={Class(styles.EmailDecorator, styles.Valid)}
          src={CheckmarkFill}
        />
      </span>
      <TextDisplay>Email Sent!</TextDisplay>
      <TextBox className={styles.SemiBold}>
        (We don&apos;t do passwords here)
      </TextBox>
    </>
  ) : (
    <>
      <span>
        <Icon src={Email} className={styles.EmailIcon} />
        <Icon
          className={Class(styles.EmailDecorator, styles.Invalid)}
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
    <Container
      className={isMobile ? styles.Panel : styles.Modal}
      overlay
      {...props}
    >
      <Button
        className={styles.Cancel}
        animate
        icon={Cancel}
        size="smaller"
        onClick={props.onExit}
      />
      <Staging stage={stage}>
        <Staging.Stage className={styles.Center} index={0}>
          <div className={styles.Title}>
            <Icon src={GatsbyPlain} size="largest" />
            <TextDisplay size="small">Sign In to Gatsby</TextDisplay>
          </div>
          <Rule className={styles.Rule} spacing="loose" />
          {/* <div className={styles.Options}> */}
          {/*   <Button className={styles.Option}> */}
          {/*     <Icon src={Google} /> */}
          {/*     Sign In with Google */}
          {/*   </Button> */}
          {/* </div> */}
          {/* <Rule className={styles.Rule} spacing="loose"> */}
          {/*   Or */}
          {/* </Rule> */}
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
            <Button
              type="submit"
              className={styles.Submit}
              waiting={loading}
              disabled={!email}
            >
              Sign In
            </Button>
          </Form>
        </Staging.Stage>
        <Staging.Stage className={styles.Confirmation} index={1}>
          {ConfirmationMarkup}
        </Staging.Stage>
      </Staging>
    </Container>
  );
}
