import React, { useCallback } from "react";
import { ifExists } from "@gatsby-tv/utilities";

import { useSelection } from "@lib/utilities/selection";
import { useFormSelect } from "@lib/utilities/form";
import { Option as SelectOption } from "@lib/types";

import styles from "../../Select.scss";

export interface OptionProps {
  option: SelectOption;
}

export function Option(props: OptionProps): React.ReactElement {
  const { option } = props;
  const { selection, setSelection } = useSelection();
  const { hover, setHover } = useFormSelect();

  return (
    <div
      className={styles.Option}
      data-hover={ifExists(hover === option.value)}
      aria-selected={ifExists(selection === option.value)}
      onClick={() => setSelection(option.value)}
      onMouseDown={(event: any) => event.preventDefault()}
      onPointerEnter={() => setHover(option.value)}
    >
      {option.label}
    </div>
  );
}
