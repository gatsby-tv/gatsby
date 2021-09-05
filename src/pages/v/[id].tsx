import { useRef, useState, useEffect, useCallback, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { useVideo } from '@gatsby-tv/content';
import Player, { TimeState } from '@gatsby-tv/player';
import {
  useScroll,
  useFrame,
  useFullscreen,
  useIPFSVideoStream,
} from '@gatsby-tv/utilities';
import { PutVideoViewResponse } from '@gatsby-tv/types';

import { Page } from '@src/layout/Page';
import { Video } from '@src/layout/Video';
import { fetcher } from '@src/utilities/fetcher';

export default function VideoPage(): ReactElement {
  const router = useRouter();
  const [fullscreen, setFullscreen] = useFullscreen();
  const { setTopbar, setSidebar } = useFrame();
  const { setScroll } = useScroll();
  const { video } = useVideo([router.query.id].flat()[0]);
  const { stream, setQuality } = useIPFSVideoStream(video?.content);
  const [time, setTime] = useState<TimeState | undefined>(undefined);
  const viewed = useRef(false);

  const onTimeUpdate = useCallback((state: TimeState) => setTime(state), []);

  useEffect(() => {
    if (!time || viewed.current) return;

    const total = time.watched.reduce(
      (acc, [start, end]) => acc + (end - start),
      0
    );

    if (total < 30 && total / time.duration < 0.6) return;
    viewed.current = true;

    fetcher<PutVideoViewResponse>(`/video/${router.query.id}/view`, {
      method: 'PUT',
    });
  }, [time]);

  useEffect(() => {
    setSidebar(false);
    setScroll(0);
  }, []);

  useEffect(() => {
    if (fullscreen) setScroll(0);
  }, [fullscreen]);

  useEffect(() => {
    if (video?.content) setScroll(0);
  }, [video?.content]);

  useEffect(() => setTopbar(!fullscreen), [fullscreen]);

  return (
    <Page margin={false} title={video ? `${video.title} - Gatsby` : undefined}>
      <Player
        ref={stream.ref}
        key={video?.content}
        muted
        fullscreen={fullscreen}
        quality={stream.quality}
        levels={stream.levels}
        setFullscreen={setFullscreen}
        setQuality={setQuality}
        onTimeUpdate={onTimeUpdate}
      />
      <Video.Layout>
        <Video.Info video={video} />
        <Video.Related video={video} />
      </Video.Layout>
    </Page>
  );
}
