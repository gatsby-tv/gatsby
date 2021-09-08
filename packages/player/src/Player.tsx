import {
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  ReactNode,
  Ref,
  Dispatch,
  SetStateAction,
} from 'react';
import { Video, VideoProps, Viewport } from '@gatsby-tv/components';
import {
  Class,
  useForwardedRef,
  useComponentWillMount,
  useMobileDetector,
} from '@gatsby-tv/utilities';

import { DesktopOverlay } from '@src/components/DesktopOverlay';
import { MobileOverlay } from '@src/components/MobileOverlay';
import { TimelineContext, useTimelineContext } from '@src/utilities/timeline';
import { PlayerContext, usePlayerContext } from '@src/utilities/player';
import { SignalContext, useSignalContext } from '@src/utilities/signal';
import { FullscreenContext } from '@src/utilities/fullscreen';
import { QualityContext } from '@src/utilities/quality';
import { TimeState } from '@src/types';

export interface PlayerProps extends Omit<VideoProps, 'onTimeUpdate'> {
  children?: ReactNode;
  fullscreen?: boolean;
  levels?: Record<number, number>;
  quality?: number;
  volume?: number;
  setFullscreen?: Dispatch<SetStateAction<boolean>>;
  setQuality?: Dispatch<SetStateAction<number>>;
  onTimeUpdate?: (state: TimeState) => void;
  onVolumeUpdate?: (state: number) => void;
  onMutedUpdate?: (state: boolean) => void;
}

import styles from './Player.scss';

export const Player = forwardRef<HTMLVideoElement, PlayerProps>(
  (props: PlayerProps, ref: Ref<HTMLVideoElement>) => {
    const {
      children,
      volume = 1,
      fullscreen = false,
      quality = -1,
      levels = {},
      setFullscreen = () => undefined,
      setQuality = () => undefined,
      onTimeUpdate = () => undefined,
      onVolumeUpdate = () => undefined,
      onMutedUpdate = () => undefined,
      ...videoProps
    } = props;

    const video = useForwardedRef<HTMLVideoElement>(ref);
    const fullscreenRef = useRef(fullscreen);
    const timeline = useTimelineContext();
    const [signal, setSignal] = useSignalContext();
    const isMobile = useMobileDetector();
    const mounted = useComponentWillMount();

    const context = usePlayerContext(
      video,
      volume,
      onTimeUpdate,
      onVolumeUpdate,
      onMutedUpdate
    );

    const { player, events, setPlayback } = context;

    const setPlaybackAndSignal = useCallback(
      (value: SetStateAction<boolean>) =>
        setPlayback((current) => {
          const playback = typeof value === 'function' ? value(current) : value;
          setSignal(playback ? 'play' : 'pause');
          return playback;
        }),
      []
    );

    const setViewportFullscreen = useCallback(
      (value: SetStateAction<boolean>) => {
        const update =
          typeof value === 'function' ? value(fullscreenRef.current) : value;

        return update
          ? void player.ref.current?.requestFullscreen()
          : void document.exitFullscreen();
      },
      []
    );

    useEffect(() => void (fullscreenRef.current = fullscreen), [fullscreen]);

    const classes = Class(
      styles.Viewport,
      fullscreen && styles.Fullscreen,
      mounted && !isMobile && styles.MinHeight
    );

    const OverlayMarkup = !mounted ? null : isMobile ? (
      <MobileOverlay />
    ) : (
      <DesktopOverlay />
    );

    return (
      <PlayerContext.Provider
        value={{
          ...context,
          setPlayback: isMobile ? setPlayback : setPlaybackAndSignal,
        }}
      >
        <TimelineContext.Provider value={timeline}>
          <SignalContext.Provider value={[signal, setSignal]}>
            <QualityContext.Provider value={{ levels, quality, setQuality }}>
              <FullscreenContext.Provider
                value={[
                  fullscreen,
                  isMobile ? setViewportFullscreen : setFullscreen,
                ]}
              >
                <Viewport
                  ref={player.ref}
                  className={classes}
                  overlay={OverlayMarkup}
                >
                  <Video ref={video} {...videoProps} {...events}>
                    {children}
                  </Video>
                </Viewport>
              </FullscreenContext.Provider>
            </QualityContext.Provider>
          </SignalContext.Provider>
        </TimelineContext.Provider>
      </PlayerContext.Provider>
    );
  }
);
