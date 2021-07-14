import React from 'react';

import styles from './Heading.module.scss';

export function Heading(): React.ReactElement {
  return (
    <div className={styles.Heading}>
      <h2>
        Gatsby is a Video Sharing Platform Hoping to Perfect Online
        Entertainment
      </h2>
    </div>
  );
}
