import React from "react";
import styled from "styled-components";
import { ifExists } from "@gatsby-tv/utilities";

import { FlexAlignItems } from "@lib/types";
import { useSelection } from "@lib/utilities/selection";
import { Flex } from "@lib/components/Flex";
import { TextSubheading } from "@lib/components/TextSubheading";

export interface SectionProps {
  children?: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
  flush?: boolean;
}

const SectionBase: React.FC<SectionProps> = (props: SectionProps) => {
  const { children, className, title, flush } = props;
  const { column } = useSelection();

  const flexProps = {
    className,
    "data-flush": ifExists(flush),
    expand: true,
    column,
    align: "stretch" as FlexAlignItems,
  };

  const TitleMarkup =
    column && title ? <TextSubheading>{title}</TextSubheading> : null;

  return (
    <Flex as="ul" {...flexProps}>
      {TitleMarkup}
      {children}
    </Flex>
  );
};

export const Section = styled(
  Object.assign(SectionBase, { Title: TextSubheading, displayName: "Section" })
)``;
