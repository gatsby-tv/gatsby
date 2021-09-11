import { ReactElement } from 'react';

import styles from './Markup.module.scss';

export function Markup(): ReactElement {
  return (
    <div className={styles.Markup}>
      <h3>What is Gatsby?</h3>
      <p>
        Gatsby is a video sharing platform based on{' '}
        <a href="https://ipfs.io">IPFS</a>, a peer-to-peer file sharing
        protocol. Our hope is to perfect online entertainment by providing a
        platform designed from the ground up with creator self-sufficiency in
        mind &mdash; a platform where creators are given total control over
        their own monetization and growth. To this end, Gatsby aims to to
        prioritize community driven, not machine driven, recommendations; as
        well as monetization strategies such as fan patronage and sponsorships.
      </p>

      <h3>End-to-End Benefits of IPFS</h3>
      <p>
        IPFS allows a platform like Gatsby to take advantage of peer-to-peer
        file sharing for more than just publishing. With IPFS content creators
        can completely eliminate the need for third-party, cloud storage
        providers; allowing them to freely share any file on their devices to
        editors and collaborators. Raw footage, project files, storyboards, and
        other assets can be seamlessly transferred within teams without any
        overhead or logistics.
      </p>

      <h3></h3>
    </div>
  );
}
