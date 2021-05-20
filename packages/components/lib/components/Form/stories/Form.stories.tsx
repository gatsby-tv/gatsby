import React, { useState } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Form, FormFieldProps, FormLabelProps } from "@lib/components/Form";

import styles from "./Form.stories.scss";

export default {
  title: "Form",
  component: Form,
} as Meta;

export const Field: Story<Partial<FormFieldProps & FormLabelProps>> = (
  props
) => {
  const { help, hidden, ...rest } = props;
  const [value, setValue] = useState("");

  const onChange = (value, id, setError, clearError) => {
    if (value.length > 10) {
      setError(id, "The provided value is greater than 10 characters.");
    } else {
      clearError(id);
    }
    setValue(value);
  };

  return (
    <Form className={styles.Form}>
      <Form.Label
        for="field"
        label="Example Field"
        help={props.help}
        hidden={props.hidden}
      >
        <Form.Field
          id="field"
          placeholder="Text..."
          name="field"
          value={value}
          onChange={onChange}
          {...rest}
        />
      </Form.Label>
    </Form>
  );
};

Field.args = {
  help: undefined,
  hidden: false,
};

export const Select: Story<Partial<FormSelectProps & FormLabelProps>> = (
  props
) => {
  const options = [
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "yellow", label: "Yellow" },
    { value: "cyan", label: "Cyan" },
  ];

  return (
    <Form className={styles.Form}>
      <Form.Label
        for="select"
        label="Example Select"
        help={props.help}
        hidden={props.hidden}
      >
        <Form.Select
          id="select"
          name="select"
          placeholder="Select..."
          options={options}
          {...props}
        />
      </Form.Label>
    </Form>
  );
};

Select.args = {
  help: undefined,
  searchable: true,
  multiple: false,
  clearable: true,
};
