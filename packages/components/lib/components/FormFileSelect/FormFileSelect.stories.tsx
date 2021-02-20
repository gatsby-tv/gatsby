import React, { useState, useEffect } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { AppProvider } from "@lib/components/AppProvider";
import { Form } from "@lib/components/Form";

import { FormFileSelect, FormFileSelectProps } from "./FormFileSelect";

export default {
  title: "FormFileSelect",
  component: FormFileSelect,
} as Meta;

export const Example: Story<FormFileSelectProps> = (args) => {
  const [file, setFile] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (file) {
      console.log(file);
    }
  }, [file])

  return (
    <AppProvider theme="dark">
      <Form>
        <FormFileSelect animate onChange={setFile}>
          Upload File
        </FormFileSelect>
      </Form>
    </AppProvider>
  );
};
