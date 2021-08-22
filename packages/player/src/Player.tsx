import {
  useEffect,
  useState,
  useCallback,
  forwardRef,
  Ref,
  Dispatch,
  SetStateAction,
} from 'react';
import { Video, Viewport } from '@gatsby-tv/components';
import {
  Class,
  useForwardedRef,
  useComponentWillMount,
  useMobileDetector,
} from '@gatsby-tv/utilities';

import { DesktopOverlay } from '@src/components/DesktopOverlay';
import { MobileOverlay } from '@src/components/MobileOverlay';
import { useTimeline } from '@src/utilities/use-timeline';
import { usePlayer } from '@src/utilities/use-player';
import { useSignal } from '@src/utilities/use-signal';
import { PlayerProps } from '@src/types';

import styles from './Player.scss';

export const Player = forwardRef<HTMLVideoElement, PlayerProps>(
  (props: PlayerProps, ref: Ref<HTMLVideoElement>) => {
    const {
      children,
      volume = 1,
      fullscreen,
      setFullscreen = () => undefined,
      ...videoProps
    } = props;

    const isMobile = useMobileDetector();
    const video = useForwardedRef<HTMLVideoElement>(ref);
    const timeline = useTimeline();
    const {
      player,
      events,
      setActive,
      setPinned,
      setSuspend,
      setPlayback,
      setVolume,
      setMuted,
      setSeek,
    } = usePlayer(video, volume);
    const [signal, setSignal] = useSignal();
    const mounted = useComponentWillMount();

    const setPlaybackAndSignal = useCallback(
      (value: SetStateAction<boolean>) =>
        setPlayback((current) => {
          const playback = typeof value === 'function' ? value(current) : value;
          setSignal(playback ? 'play' : 'pause');
          return playback;
        }),
      []
    );

    useEffect(() => setActive(!isMobile), [isMobile]);

    const OverlayMarkup = !mounted ? null : isMobile ? (
      <MobileOverlay
        player={player}
        timeline={timeline}
        signal={signal}
        fullscreen={fullscreen}
        setFullscreen={setFullscreen}
        setActive={setActive}
        setPinned={setPinned}
        setSuspend={setSuspend}
        setPlayback={setPlayback}
        setVolume={setVolume}
        setMuted={setMuted}
        setSeek={setSeek}
        setSignal={setSignal}
      />
    ) : (
      <DesktopOverlay
        player={player}
        timeline={timeline}
        signal={signal}
        fullscreen={fullscreen}
        setFullscreen={setFullscreen}
        setActive={setActive}
        setPinned={setPinned}
        setSuspend={setSuspend}
        setPlayback={setPlaybackAndSignal}
        setVolume={setVolume}
        setMuted={setMuted}
        setSeek={setSeek}
        setSignal={setSignal}
      />
    );

    const classes = Class(
      styles.Viewport,
      fullscreen && styles.ViewportFullscreen,
      mounted && !isMobile && styles.ViewportMinHeight
    );

    return (
      <Viewport
        ref={player.ref}
        className={classes}
        aspectRatio={player.aspectRatio}
        overlay={OverlayMarkup}
      >
        <Video ref={video} {...videoProps} {...events}>
          {children}
        </Video>
      </Viewport>
    );
  }
);
