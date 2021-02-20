import React, { useCallback, useMemo } from "react";

import { Box, BoxProps } from "@lib/components/Box";
import { FormContext } from "@lib/utilities/form";

export type FormProps = BoxProps & React.FormHTMLAttributes<HTMLElement>;

export function Form(props: FormProps): React.ReactElement {
  const { method = "POST", action = "", ...rest } = props;
  const form = useMemo(() => new FormData(), []);
  const context = { form };

  const onSubmit = useCallback((event) => {
    event.preventDefault();
    const request = new XMLHttpRequest();
    request.open(method.toUpperCase(), action, true);
    request.send(context.form);
  }, []);

  const formProps = {
    onSubmit,
    ...rest,
  };

  return (
    <FormContext.Provider value={context}>
      <Box as="form" {...formProps} />
    </FormContext.Provider>
  );
}
