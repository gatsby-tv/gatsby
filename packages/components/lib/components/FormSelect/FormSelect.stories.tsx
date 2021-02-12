import React, { useState, useCallback } from "react";
import { css } from "styled-components";
import { Story, Meta } from "@storybook/react/types-6-0";

import { AppProvider } from "@lib/components/AppProvider";

import { FormSelect, FormSelectProps } from "./FormSelect";

const selectStyle = css`
  border-radius: ${(props) => props.theme.border.radius.small};
  background-color: ${(props) => props.theme.colors.background[3]};

  option {
    color: ${(props) => props.theme.colors.font.inverted};
  }
`;

export default {
  title: "FormSelect",
  component: FormSelect,
} as Meta;

export const Example: Story<FormSelectProps> = () => {
  const [selection, setSelection] = useState("one");
  const onChange = useCallback((value) => setSelection(value), []);
  const options = [
    { label: "One", value: "one" },
    { label: "Two", value: "two" },
    { label: "Three", value: "three" },
  ];

  return (
    <AppProvider theme="dark">
      <FormSelect
        css={selectStyle}
        label="Example Selection"
        options={options}
        selection={selection}
        onChange={onChange}
      />
    </AppProvider>
  );
};
