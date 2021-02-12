import React from "react";

import { Box, BoxProps } from "@lib/components/Box";

export type FormProps = BoxProps & React.FormHTMLAttributes<HTMLElement>;

export function Form(props: FormProps): React.ReactElement {
  return <Box as="form" {...props} />;
}
