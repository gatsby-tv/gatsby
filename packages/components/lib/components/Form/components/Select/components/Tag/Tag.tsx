import { ReactElement } from 'react';
import { Cancel } from '@gatsby-tv/icons';

import { Button } from '@lib/components/Button';
import { useSelection } from '@lib/utilities/selection';
import { Option as SelectOption } from '@lib/types';

import styles from './Tag.scss';

export interface TagProps {
  option: SelectOption;
}

export function Tag(props: TagProps): ReactElement {
  const { option } = props;
  const { clearSelection } = useSelection();

  return (
    <div
      className={styles.Tag}
      onMouseDown={(event: any) => event.preventDefault()}
    >
      <span>{option.label}</span>
      <Button
        className={styles.Clear}
        icon={Cancel}
        size="smallest"
        onClick={() => clearSelection?.(option.value)}
        onMouseDown={(event: any) => {
          event.stopPropagation();
          event.preventDefault();
        }}
      />
    </div>
  );
}
