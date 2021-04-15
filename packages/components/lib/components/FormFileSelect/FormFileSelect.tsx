import React, { useCallback } from "react";
import { useUniqueId } from "@gatsby-tv/utilities";

import { useForm } from "@lib/utilities/form";
import { Button, ButtonProps } from "@lib/components/Button";

import styles from "./FormFileSelect.scss";

export interface FormFileSelectProps extends Omit<ButtonProps, "onChange"> {
  id?: string;
  name?: string;
  onChange?: (value: string, id: string) => void;
}

export function FormFileSelect(props: FormFileSelectProps): React.ReactElement {
  const {
    id: idProp,
    name,
    onChange: onChangeHandler = () => undefined,
    ...rest
  } = props;

  const id = useUniqueId(idProp ? `fileselect-${idProp}` : "fileselect");
  const { form } = useForm();

  const onChange = useCallback(
    (event) => {
      const value = event.currentTarget.value;
      onChangeHandler(value, id);
      if (name) {
        form.set(name, value);
      }
    },
    [id, form]
  );

  return (
    <>
      <input
        id={id}
        className={styles.VisuallyHidden}
        name={name}
        type="file"
        onChange={onChange}
      />
      <Button asLabelFor={id} {...rest} />
    </>
  );
}
