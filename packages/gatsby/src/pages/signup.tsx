import React from "react";

import { Grid } from "@gatsby-tv/components";
import { useTheme } from "@gatsby-tv/utilities";

import { SignUp } from "@src/components/SignUp";

export default function SignUpPage(): React.ReactElement {
  return (
    <>
      <Grid center="true" margin={["100px", "100px", "0px"]}>
        <SignUp />
      </Grid>
    </>
  );
}
