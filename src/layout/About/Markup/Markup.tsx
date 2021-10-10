import { ReactElement } from 'react';
import { Rule } from '@gatsby-tv/components';

import styles from './Markup.module.scss';

export function Markup(): ReactElement {
  return (
    <div className={styles.Markup}>
      <h2>
        Gatsby is an open-source video sharing platform
        <br />
        based on peer-to-peer networking
      </h2>

      <Rule />

      <h3>Gatsby for Audiences</h3>

      <ul>
        <li>
          No ads. Our long-term goal is to support creators through sponsorships
          rather than ordinary advertising.
        </li>
        <li>
          Focus on long form, serialized content. Episodic videos are treated as
          first-class from the start.
        </li>
        <li>
          Free forever. No monthly subscriptions, and no pay-per-view mechanics
          preventing users from engaging with creators.
        </li>
      </ul>

      <h3>Gatsby for Creators</h3>

      <ul>
        <li>
          Predictable recommendations. Creators will no longer be beholden to a
          system that nobody understands.
        </li>
        <li>
          Creator studio. An application for sharing large files between
          collaborators. No costs, and no clouds.
        </li>
        <li>
          User patronage. We plan to incorporate built-in support for users to
          tip creators and provide monthly donations.
        </li>
        <li>
          First-class support for sponsorships. We someday hope to make
          fulfilling sponsorships trivial for channels of all sizes.
        </li>
      </ul>

      <Rule spacing="extraloose" />

      <h3>
        Peer-to-peer file distribution and <a href="https://ipfs.io">IPFS</a>
      </h3>

      <p>
        Peer-to-peer file distribution is a method for storing and sharing files
        in a way that doesn't depend on any centralized source. Files are
        instead broken up into small pieces and traded amongst all of the
        computers using the same protocol. IPFS is one such protocol and it
        enables us as a platform to eliminate the convential barriers to entry
        to video sharing.
      </p>

      <h3>Current state of the project</h3>

      <p>
        As of now, Gatsby is in its early, proof-of-concept stages;
        demonstrating the efficacy of IPFS for hosting/streaming video in the
        browser.
      </p>

      <p>
        Our primary goal from here is to work on the creator studio. The studio
        is planned to not only be a tool for hosting videos on Gatsby, but to
        also be a hub for sharing footage and assets with collaborators using
        IPFS.
      </p>
    </div>
  );
}
