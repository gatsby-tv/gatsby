import React from 'react';
//import { Rule } from '@gatsby-tv/components';
import { useFrame } from '@gatsby-tv/utilities';
import { ExtendDown, Gatsby } from '@gatsby-tv/icons';

import { Page } from '@src/components/Page';
import { About } from '@src/components/Info';

import styles from '@src/styles/About.module.scss';

export default function AboutPage(): React.ReactElement {
  const { screen, offset } = useFrame();

  return (
    <Page title="Gatsby - About" margin={false}>
      <About.Landing />
      <About.Layout>
        <About.Heading />
        <About.Ipfs />
        <About.Markup />
      </About.Layout>
    </Page>
  );
}
