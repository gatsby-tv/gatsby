import { ReactElement } from 'react';
import { Exists, useFormSelect } from '@gatsby-tv/utilities';

import { useSelection } from '@lib/utilities/selection';
import { Option as SelectOption } from '@lib/types';

import styles from './Option.scss';

export interface OptionProps {
  option: SelectOption;
}

export function Option(props: OptionProps): ReactElement {
  const { option } = props;
  const { selection, setSelection } = useSelection();
  const { hover, setHover } = useFormSelect();

  return (
    <div
      className={styles.Option}
      data-hover={Exists(hover === option.value)}
      aria-selected={Exists(selection === option.value)}
      onClick={() => setSelection(option.value)}
      onMouseDown={(event: any) => event.preventDefault()}
      onPointerEnter={() => setHover(option.value)}
    >
      {option.label}
    </div>
  );
}
