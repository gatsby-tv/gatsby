import { useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { useVideo } from '@gatsby-tv/content';
import Player from '@gatsby-tv/player';
import { useScroll, useFrame, useIPFSVideoStream } from '@gatsby-tv/utilities';

import { Page } from '@src/layout/Page';
import { Video } from '@src/layout/Video';

export default function VideoPage(): ReactElement {
  const router = useRouter();
  const { fullscreen, setFullscreen, setTopbar, setSidebar } = useFrame();
  const { setScroll } = useScroll();
  const { video } = useVideo([router.query.id].flat()[0]);
  const player = useIPFSVideoStream(video?.content);

  useEffect(() => {
    setSidebar(false);
    setScroll(0);
  }, [setSidebar]);

  useEffect(() => {
    if (fullscreen) setScroll(0);
  }, [fullscreen]);

  useEffect(() => setTopbar(!fullscreen), [fullscreen]);

  return (
    <Page margin={false} title={video ? `${video.title} - Gatsby` : undefined}>
      <Player
        ref={player}
        muted
        fullscreen={fullscreen}
        setFullscreen={setFullscreen}
      />
      <Video.Layout>
        <Video.Info video={video} />
        <Video.Related video={video} />
      </Video.Layout>
    </Page>
  );
}
