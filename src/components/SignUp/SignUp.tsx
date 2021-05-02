import React from "react";
import {
  Button,
  Form,
  FormField,
  Fireworks,
  Icon,
  ModalProps,
  TextDisplay,
} from "@gatsby-tv/components";
import { GatsbyPlain } from "@gatsby-tv/icons";

import styles from "./SignUp.module.scss";

export function SignUp(): React.ReactElement {
  const emailProps = {
    id: "email",
    name: "email",
    label: "Email",
    labelHidden: true,
    placeholder: "Email",
    //font: theme.font[4],
    spellCheck: false,
    autoComplete: true,
  };
  const channelNameProps = {
    id: "channel",
    name: "channel",
    label: "Channel Name",
    labelHidden: true,
    placeholder: "Channel Name",
    //font: theme.font[4],
    spellCheck: false,
    autoComplete: false,
  };
  const displayNameProps = {
    id: "display",
    name: "display",
    label: "Display Name",
    labelHidden: true,
    placeholder: "Display Name",
    //font: theme.font[4],
    spellCheck: false,
    autoComplete: false,
  };

  const TitleMarkup = (
    <div className={styles.Title}>
      <Icon src={GatsbyPlain} size="largest" />
      <TextDisplay size="small">Sign Up for Gatsby</TextDisplay>
    </div>
  );

  const FormMarkup = (
    <Form method="post" action="/api/auth/signup">
      <div className={styles.FormPiece}>
        <FormField type="text" {...emailProps} className={styles.FormTextBox} />
      </div>
      <div className={styles.FormPiece}>
        <FormField type="text" {...channelNameProps} className={styles.FormTextBox} />
      </div>
      <div className={styles.FormPiece}>
        <FormField type="text" {...displayNameProps} className={styles.FormTextBox} />
      </div>


      <Button
        type="submit"
        onClick={() => alert("This has not been set up yet.")}
        className={styles.Submit}
      >
        Submit
      </Button>
    </Form>
  );
  
  return (
    <>
      <div className={styles.BigusDivus}>
        <div className={styles.CardDiv}>
          {TitleMarkup}
          {/*FormMarkup*/}
        </div>
      </div>
      <Fireworks infinite zIndex={-1} />
    </>
  );
}
