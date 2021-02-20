import React, { useState, useCallback } from "react";
import { css } from "styled-components";
import { Story, Meta } from "@storybook/react/types-6-0";
import { useSelect } from "@gatsby-tv/utilities";

import { AppProvider } from "@lib/components/AppProvider";
import { Form } from "@lib/components/Form";

import { FormSelect, FormSelectProps } from "./FormSelect";

export default {
  title: "FormSelect",
  component: FormSelect,
} as Meta;

export const Example: Story<FormSelectProps> = () => {
  const [selection, setSelection] = useSelect(["one", "two", "three"]);
  const options = [
    { label: "One", value: "one" },
    { label: "Two", value: "two" },
    { label: "Three", value: "three" },
  ];

  return (
    <AppProvider theme="dark">
      <Form>
        <FormSelect
          label="Example Selection"
          placeholder="Example selection..."
          options={options}
          selection={selection}
          onChange={setSelection}
        />
      </Form>
    </AppProvider>
  );
};
