import { useState, useEffect, useCallback, ReactElement } from 'react';
import { Panel, PanelProps, Selection, Injection } from '@gatsby-tv/components';
import { Class, Exists } from '@gatsby-tv/utilities';

import { usePlayer } from '@src/utilities/player';
import { useQuality } from '@src/utilities/quality';
import { useFullscreen } from '@src/utilities/fullscreen';

import styles from './Settings.scss';

export interface SettingsProps
  extends Required<Pick<PanelProps, 'active' | 'onExit'>> {
  overlay: string;
}

export function Settings(props: SettingsProps): ReactElement {
  const { overlay, active, onExit } = props;

  const { player, setPinned } = usePlayer();
  const { levels, quality, setQuality } = useQuality();
  const [fullscreen] = useFullscreen();

  const [injection, setInjection] = useState(false);
  const [resolution, setResolution] = useState(String(quality));

  const onPointerUp = useCallback((event: any) => event.stopPropagation(), []);
  const onTransitionEnd = useCallback(() => setInjection(false), []);

  useEffect(() => setPinned(active), [active]);
  useEffect(() => setQuality(Number(resolution)), [resolution]);
  useEffect(() => onExit(), [resolution]);

  useEffect(() => {
    if (!active) return;
    setInjection(true);
  }, [active]);

  const LevelsMarkup = Object.entries(levels)
    .sort(([, left], [, right]) => (left < right ? 1 : -1))
    .map(([key, value]) => (
      <Selection.Item key={`${value}.${key}`} option={key}>
        {value >= 720 ? (
          <span>
            {`${value}p`}
            <sup>HD</sup>
          </span>
        ) : (
          `${value}p`
        )}
      </Selection.Item>
    ));

  return (
    <Injection target={Exists(injection, overlay)}>
      <div className={styles.Container} onPointerUp={onPointerUp}>
        <Panel
          className={Class(styles.Settings, fullscreen && styles.Fullscreen)}
          overlay={!fullscreen}
          direction="bottom"
          active={active}
          onExit={onExit}
          onTransitionEnd={onTransitionEnd}
        >
          <Selection
            itemClass={styles.Item}
            scrollHidden
            selection={resolution}
            onSelect={setResolution}
          >
            {LevelsMarkup}
            <Selection.Item option="-1">Auto</Selection.Item>
          </Selection>
        </Panel>
      </div>
    </Injection>
  );
}
