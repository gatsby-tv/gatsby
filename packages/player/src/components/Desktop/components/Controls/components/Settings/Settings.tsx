import {
  useState,
  useEffect,
  ReactElement,
} from 'react';
import { Menu, MenuProps, Selection } from '@gatsby-tv/components';

import { usePlayer } from '@src/utilities/player';
import { useQuality } from '@src/utilities/quality';

import styles from './Settings.scss';

export interface SettingsProps
  extends Required<Pick<MenuProps, 'for' | 'active' | 'onExit'>> {}

export function Settings(props: SettingsProps): ReactElement {
  const { active, onExit } = props;

  const { player, setPinned } = usePlayer();
  const { levels, quality, setQuality } = useQuality();

  const [resolution, setResolution] = useState(String(quality));

  useEffect(() => {
    if (player.active) return;
    onExit();
  }, [player.active]);

  useEffect(() => void setPinned(active), [active]);
  useEffect(() => void setQuality(Number(resolution)), [resolution]);
  useEffect(onExit, [resolution]);

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
    <Menu
      for={props.for}
      className={styles.Settings}
      placement="top"
      offset={[-50, 14]}
      active={active}
      onExit={onExit}
    >
      <div>
        <Selection
          scrollHidden
          selection={resolution}
          onSelect={setResolution}
        >
          {LevelsMarkup}
          <Selection.Item option="-1">Auto</Selection.Item>
        </Selection>
      </div>
    </Menu>
  );
}
