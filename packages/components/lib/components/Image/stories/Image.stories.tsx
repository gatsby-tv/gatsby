import { Story, Meta } from '@storybook/react/types-6-0';

import { Image, ImageProps } from '@lib/components/Image';

import styles from './Image.stories.scss';

export default {
  title: 'Image',
  component: Image,
} as Meta;

const Template: Story<ImageProps> = (props) => (
  <Image className={styles.Image} {...props} />
);

export const DefaultAspectRatio = Template.bind({});
DefaultAspectRatio.args = {
  src: 'https://loremflickr.com/405/405',
};

export const DefaultAspectRatioSkeleton = Template.bind({});
DefaultAspectRatioSkeleton.args = {
  src: '',
};

export const WideAspectRatio = Template.bind({});
WideAspectRatio.args = {
  src: 'https://loremflickr.com/720/405',
  aspectRatio: '16 / 9',
};

export const WideAspectRatioSkeleton = Template.bind({});
WideAspectRatioSkeleton.args = {
  src: '',
  aspectRatio: '16 / 9',
};

export const TallAspectRatio = Template.bind({});
TallAspectRatio.args = {
  src: 'https://loremflickr.com/405/720',
  aspectRatio: '9 / 16',
};

export const TallAspectRatioSkeleton = Template.bind({});
TallAspectRatioSkeleton.args = {
  src: '',
  aspectRatio: '9 / 16',
};

export const IncorrectAspectRatio = Template.bind({});
IncorrectAspectRatio.args = {
  src: 'https://loremflickr.com/405/720',
  aspectRatio: '16 / 9',
};
