import React, { useCallback, useMemo } from "react";

import { FormContext } from "@lib/utilities/form";

export type FormProps = React.FormHTMLAttributes<HTMLElement>;

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

  return (
    <FormContext.Provider value={context}>
      <form onSubmit={onSubmit} {...rest} />
    </FormContext.Provider>
  );
}
