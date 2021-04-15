import React, { useState, useEffect } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Form } from "@lib/components/Form";
import {
  FormFileSelect,
  FormFileSelectProps,
} from "@lib/components/FormFileSelect";

export default {
  title: "FormFileSelect",
  component: FormFileSelect,
} as Meta;

export const Example: Story<FormFileSelectProps> = () => {
  const [file, setFile] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (file) {
      console.log(file);
    }
  }, [file]);

  return (
    <Form>
      <FormFileSelect animate onChange={setFile}>
        Upload File
      </FormFileSelect>
    </Form>
  );
};
