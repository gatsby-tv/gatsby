import { Story, Meta } from '@storybook/react/types-6-0';
import { Class } from '@gatsby-tv/utilities';

import {
  TextMeta,
  TextMetaProps,
  TextMetaListProps,
  TextMetaLinkProps,
} from '@lib/components/TextMeta';

import styles from './TextMeta.stories.scss';

export default {
  title: 'TextMeta',
  component: TextMeta,
} as Meta;

const Template: Story<TextMetaProps & { font: string }> = ({
  font,
  ...props
}) => (
  <TextMeta
    className={Class(styles.TextMeta, styles[`TextMeta-${font}`])}
    {...props}
  />
);

export const Small = Template.bind({});
Small.args = {
  children: 'Meta Text Small',
  font: 'small',
};

export const Medium = Template.bind({});
Medium.args = {
  children: 'Meta Text Medium',
  font: 'medium',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Meta Text Large',
  font: 'large',
};

export const Truncated = Template.bind({});
Truncated.args = {
  children: 'The Art of Storytelling and The Legend of Chun Li',
  tooltip: true,
  clamp: 2,
  font: 'large',
};

const ListTemplate: Story<TextMetaListProps & { font: string }> = ({
  font,
  ...props
}) => (
  <TextMeta.List className={styles[`TextMeta-${font}`]} {...props}>
    <TextMeta>First</TextMeta>
    <TextMeta>Second</TextMeta>
    <TextMeta>Third</TextMeta>
  </TextMeta.List>
);

export const ListSmall = ListTemplate.bind({});
ListSmall.args = {
  font: 'small',
};

export const ListMedium = ListTemplate.bind({});
ListMedium.args = {
  font: 'medium',
};

export const ListLarge = ListTemplate.bind({});
ListLarge.args = {
  font: 'large',
};

const LinkTemplate: Story<TextMetaLinkProps & { font: string }> = ({
  font,
  ...props
}) => (
  <TextMeta.Link className={styles[`TextMeta-${font}`]} {...props}>
    Text Meta Link
  </TextMeta.Link>
);

export const LinkSmall = LinkTemplate.bind({});
LinkSmall.args = {
  font: 'small',
};

export const LinkMedium = LinkTemplate.bind({});
LinkMedium.args = {
  font: 'medium',
};

export const LinkLarge = LinkTemplate.bind({});
LinkLarge.args = {
  font: 'large',
};
