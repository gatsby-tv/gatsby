import { ReactElement } from 'react';
import { TextBox, TextPlaceholder, Rule } from '@gatsby-tv/components';

import styles from './Description.scss';

export function Skeleton(): ReactElement {
  return (
    <>
      <TextBox gap="tight">
        <TextPlaceholder font="body-large" width={0.7} />
        <TextPlaceholder font="body-large" width={0.5} />
        <TextPlaceholder font="body-large" width={0.3} />
      </TextBox>
      <Rule />
    </>
  );
}
