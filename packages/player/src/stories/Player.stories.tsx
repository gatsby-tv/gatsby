import { Story, Meta } from '@storybook/react/types-6-0';
import { useFullscreen } from '@gatsby-tv/utilities';

import { Player } from '@src/Player';
import { PlayerProps } from '@src/types';

export default {
  title: 'Player',
  component: Player,
} as Meta;

const Template: Story<PlayerProps> = (props) => {
  const [fullscreen, setFullscreen] = useFullscreen();

  return (
    <Player
      fullscreen={fullscreen}
      setFullscreen={setFullscreen}
      {...props}
    />
  );
};

export const Blank = Template.bind({});
Blank.args = {
  src: '',
  muted: true,
  autoPlay: true,
};

export const DefaultAspectRatio = Template.bind({});
DefaultAspectRatio.args = {
  src: 'https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps_1920x1080_8000k.mp4',
  poster: 'https://ipfs.io/ipfs/QmeHbkyKQdGXyz4U8FNHu1SvSDQnpZxWkcFPBRfNWVVSnA',
  muted: true,
  autoPlay: true,
};

export const WideAspectRatio = Template.bind({});
WideAspectRatio.args = {
  src: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Spring_-_Blender_Open_Movie.webm',
  poster: 'https://ipfs.io/ipfs/QmRm8aSK3ScRet1BwjLmNm8eEA4crGNhYUmpqZXkiRhbZY',
  muted: false,
  autoPlay: true,
};
