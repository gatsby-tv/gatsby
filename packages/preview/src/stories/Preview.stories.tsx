import { Story, Meta } from '@storybook/react/types-6-0';

import { Preview } from '@src/Preview';
import { PreviewProps } from '@src/types';

import styles from './Preview.stories.scss';

export default {
  title: 'Preview',
  component: Preview,
} as Meta;

const blender = {
  _id: 'b77d279bdef3cf0cab84a77649ed76b339c26a6f',
  name: 'Blender Animation Studio',
  handle: 'blender',
  description: '',
  verified: true,
  subscribers: 245871,
  creationDate: new Date('2013-11-23'),
  avatar: {
    hash: 'QmVykuqj5kVXgXTjhJiCqVUsjiZp7aHMsKownggJuB1dWS',
    mimeType: 'image/jepg',
  },
  poster: {
    hash: 'QmaGEFFmwH5woHp2CephGGE7th7JhXAPKim3vcWg5p3hwx',
    mimeType: 'image/jpeg',
  },
  banner: {
    hash: 'QmcPw9xFWsGcaQcccH5ccMayqViwsToPhCEmvKRaaxziSp',
    mimeType: 'image/jpeg',
  },
};

const spring = {
  _id: '7bbdd71d495caa32b18246d626b40d8950f43167',
  content: 'QmSaMcnrPga65Thu6wFa4zesHAczjLVEus4U7rceeCVA86',
  releaseDate: new Date('2019-04-04'),
  duration: 465,
  thumbnail: {
    hash: 'QmRm8aSK3ScRet1BwjLmNm8eEA4crGNhYUmpqZXkiRhbZY',
    mimeType: 'image/webp',
  },
  title: 'Spring - Blender Open Movie',
  tags: [],
  views: 6007258,
  description: '',
  channel: blender,
};

const Template: Story<PreviewProps> = (props) => (
  <div className={styles.Container}>
    <Preview {...props} />
  </div>
);

export const Video = Template.bind({});
Video.args = {
  content: spring,
};

export const VideoWithBookmark = Template.bind({});
VideoWithBookmark.args = {
  content: spring,
  bookmark: { timestamp: 0.7 },
};
