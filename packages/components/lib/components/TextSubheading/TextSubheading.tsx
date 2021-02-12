import styled from "styled-components";

import { cssTextSubheading } from "@lib/styles/typography";
import { TextHeading } from "@lib/components/TextHeading";

export const TextSubheading = styled.h3`
  ${cssTextSubheading}

  ${TextHeading} + & {
    margin-top: ${(props) => props.theme.spacing[0.5]};
  }
`;
