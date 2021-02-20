import React, { useCallback } from "react";
import { useTheme, useUniqueId } from "@gatsby-tv/utilities";

import { useForm } from "@lib/utilities/form";
import { Button, ButtonProps } from "@lib/components/Button";
import { VisuallyHidden } from "@lib/components/VisuallyHidden";

export interface FormFileSelectProps extends Omit<ButtonProps, "onChange"> {
  id?: string;
  name?: string;
  onChange?: (value: string, id: string) => void;
}

export function FormFileSelect(props: FormFileSelectProps): React.ReactElement {
  const theme = useTheme();
  const id = useUniqueId(props.id ? `fileselect-${props.id}` : "fileselect");
  const { form } = useForm();
  const { name, onChange = () => undefined, ...rest } = props;

  const handleChange = useCallback((event) => {
    const value = event.currentTarget.value;
    onChange(value, id);
    if (name) {
      form.set(name, value);
    }
  }, [])

  const inputProps = {
    id,
    name,
    type: "file",
    onChange: handleChange,
  };

  const buttonProps = {
    asLabelFor: id,
    ...rest,
  };

  return (
    <>
      <VisuallyHidden as="input" {...inputProps} />
      <Button {...buttonProps} />
    </>
  );
}
