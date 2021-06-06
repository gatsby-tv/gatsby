import React from 'react';

import { SignUp } from '@src/components/SignUp';

import styles from '@src/styles/SignUp.module.scss';

export default function SignUpPage(): React.ReactElement {
  return (
    <>
      <div className={styles.SignUpContainer}>
        <SignUp />
      </div>
    </>
  );
}
