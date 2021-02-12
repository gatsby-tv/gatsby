import React from "react";
import styled from "styled-components";

import { TextBox } from "@lib/components/TextBox";
import { cssTextCaption } from "@lib/styles/typography";

export interface TextCaptionProps {
  children?: React.ReactNode;
}

export const TextCaption = styled.p<TextCaptionProps>`
  ${cssTextCaption}
  margin: 0;

  ${TextBox} > & {
    margin-top: 0 !important;
  }
`;
