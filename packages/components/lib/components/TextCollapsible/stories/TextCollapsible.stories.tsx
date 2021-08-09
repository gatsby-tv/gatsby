import { Story, Meta } from '@storybook/react/types-6-0';
import { LoremIpsum } from 'react-lorem-ipsum';

import { TextBox } from '@lib/components/TextBox';
import {
  TextCollapsible,
  TextCollapsibleProps,
} from '@lib/components/TextCollapsible';

import styles from './TextCollapsible.stories.scss';

export default {
  title: 'TextCollapsible',
  component: TextCollapsible,
} as Meta;

export const Example: Story<TextCollapsibleProps> = () => (
  <TextCollapsible className={styles.Collapsible} label="Click Me">
    <TextBox className={styles.Content}>
      <LoremIpsum p={2} />
    </TextBox>
  </TextCollapsible>
);
