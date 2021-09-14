import { useRef, useState, useEffect, useCallback, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { useVideo } from '@gatsby-tv/services';
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

  const viewed = useRef(false);
  const [time, setTime] = useState<TimeState | undefined>(undefined);

  const [volume, setVolume] = useState<number | undefined>(() => {
    const volume = window.localStorage.getItem('player-volume');
    if (!volume) return;
    const value = Number(volume);
    return isFinite(value) ? value : undefined;
  });

  const [muted, setMuted] = useState<boolean | undefined>(() => {
    const muted = window.localStorage.getItem('player-muted');
    return muted === 'true';
  });

  const onTimeUpdate = useCallback((state: TimeState) => setTime(state), []);
  const onVolumeUpdate = useCallback((state: number) => setVolume(state), []);
  const onMutedUpdate = useCallback((state: boolean) => setMuted(state), []);

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

  useEffect(
    () => window.localStorage.setItem('player-volume', String(volume)),
    [volume]
  );

  useEffect(
    () => window.localStorage.setItem('player-muted', String(muted)),
    [muted]
  );

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
        muted={muted}
        volume={volume}
        fullscreen={fullscreen}
        quality={stream.quality}
        levels={stream.levels}
        setFullscreen={setFullscreen}
        setQuality={setQuality}
        onTimeUpdate={onTimeUpdate}
        onVolumeUpdate={onVolumeUpdate}
        onMutedUpdate={onMutedUpdate}
      />
      <Video.Layout>
        <Video.Info video={video} />
        <Video.Related video={video} />
      </Video.Layout>
    </Page>
  );
}
