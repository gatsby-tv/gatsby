import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { DownTick } from "@gatsby-tv/icons";
import { ifExists, useUniqueId, useTheme } from "@gatsby-tv/utilities";

import { FlexJustifyContent } from "@lib/types";
import { cssTransition } from "@lib/styles/transition";
import { Box } from "@lib/components/Box";
import { TextBox } from "@lib/components/TextBox";
import { Flex } from "@lib/components/Flex";
import { Icon } from "@lib/components/Icon";
import { VisuallyHidden } from "@lib/components/VisuallyHidden";

export interface TextCollapsibleProps {
  children?: React.ReactNode;
  className?: string;
  label?: string;
  active?: boolean;
}

const TextCollapsibleStyle = styled.div`
  ${Box}[data-collapsible="content"] {
    max-height: 0px;
    overflow: hidden;
    ${(props) =>
      cssTransition("max-height", props.theme.duration.fast, "ease-in-out")}
  }

  input:checked ~ ${Box}[data-collapsible="content"] {
    max-height: 100vh;
  }

  ${Box}[data-collapsible="content"] > * {
    transition: border-top-left-radius
        ${(props) => `${props.theme.duration.instant}ms`} linear
        ${(props) => `${props.theme.duration.fast}ms`},
      border-top-right-radius ${(props) =>
        `${props.theme.duration.instant}ms`} linear
        ${(props) => `${props.theme.duration.fast}ms`};
  }

  input:checked ~ ${Box}[data-collapsible="content"] > * {
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
    transition: border-top-left-radius
        ${(props) => `${props.theme.duration.instant}ms`} linear
        ${(props) => `${props.theme.duration.instant}ms`},
      border-top-right-radius ${(props) =>
        `${props.theme.duration.instant}ms`} linear
        ${(props) => `${props.theme.duration.instant}ms`};
  }

  ${Box}[data-collapsible="label"] {
    cursor: pointer;
    display: inline-flex;
    outline: none;
    ${(props) =>
      cssTransition(
        "all",
        props.theme.duration.instant,
        "linear",
        props.theme.duration.fast
      )}
  }

  input:checked ~ ${Box}[data-collapsible="label"] {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    ${(props) =>
      cssTransition(
        "all",
        props.theme.duration.instant,
        "linear",
        props.theme.duration.instant
      )}
  }

  ${Box}[data-collapsible="label"] svg {
    ${(props) => cssTransition("all", props.theme.duration.fast, "ease-in-out")}
  }

  input:checked ~ ${Box}[data-collapsible="label"] svg {
    transform: rotate(180deg);
  }
`;

export function TextCollapsible(
  props: TextCollapsibleProps
): React.ReactElement {
  const { children, className, active, label } = props;
  const id = useUniqueId("collapsible");
  const labelRef = useRef<HTMLLabelElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  useEffect(() => {
    if (!contentRef.current || !labelRef.current) return;
    contentRef.current.style.width = `${
      labelRef.current.getBoundingClientRect().width
    }px`;

    labelRef.current.addEventListener("keydown", (event: Event) => {
      const code = (event as any).code;
      if (code === "Enter" || code === "Space") {
        event.preventDefault();
        event.stopPropagation();
        labelRef.current?.click();
      }
    });
  }, []);

  const inputProps = {
    id,
    type: "checkbox",
    checked: ifExists(active),
  };

  const flexProps = {
    ref: labelRef,
    htmlFor: id,
    tabIndex: -1,
    className,
    "data-collapsible": "label",
    expand: true,
    justify: "space-between" as FlexJustifyContent,
    gap: theme.spacing[1],
  };

  return (
    <TextCollapsibleStyle>
      <VisuallyHidden as="input" {...inputProps} />
      <Flex as="label" {...flexProps}>
        <TextBox>{label}</TextBox>
        <Icon src={DownTick} w="1.2rem" />
      </Flex>
      <Box ref={contentRef} data-collapsible="content">
        {children}
      </Box>
    </TextCollapsibleStyle>
  );
}
