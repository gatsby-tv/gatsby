import React, { useState, useRef } from "react";
import { css } from "styled-components";
import { ifExists, useTheme, useUniqueId } from "@gatsby-tv/utilities";

import { Margin, FlexAlignItems } from "@lib/types";
import { cssProperty } from "@lib/styles/property";
import { cssTextInput } from "@lib/styles/typography";
import { cssInputBorder } from "@lib/styles/borders";
import { Flex } from "@lib/components/Flex";
import { FormLabel } from "@lib/components/FormLabel";

export interface FormFieldProps {
  id?: string;
  className?: string;
  label: string;
  labelHidden?: boolean;
  multiline?: boolean;
  padding?: Margin;
  font?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  align?: "left" | "center" | "right";
  help?: string;
  error?: Error;
  clearButton?: boolean;
  disabled?: boolean;
  focused?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  autoComplete?: boolean;
  spellCheck?: boolean;
  maxLength?: number;
  max?: number | string;
  minLength?: number;
  min?: number | string;
  pattern?: string;
  type?: string;
  name?: string;
  role?: string;
  defaultValue?: string;
  onChange?: (value: string, id: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function FormField(props: FormFieldProps): React.ReactElement {
  const theme = useTheme();
  const id = useUniqueId(props.id ? `textfield-${props.id}` : "textfield");

  const {
    className,
    font,
    label,
    labelHidden,
    multiline,
    prefix,
    suffix,
    align,
    help,
    error,
    focused,
    autoComplete,
    padding = [theme.spacing[0.5], theme.spacing[1]],
    onChange = () => undefined,
    ...inputProps
  } = props;

  const [focus, setFocus] = useState(Boolean(focused));
  const input = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.value, id);
  };

  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(false);
  const handleClick = () => input?.current?.focus();

  const placeholderStyle = css`
    color: ${theme.colors.font.body.fade(0.5).toString()};
  `;

  const inputStyle = css`
    ${cssTextInput}
    ${cssInputBorder}
    ${cssProperty("font-size", font)}
    cursor: text;
    border-radius: ${theme.border.radius.small};
    background-color: ${theme.colors.background[4].toString()};

    input {
      ${cssTextInput}
      ${cssProperty("text-align", align, "left")}
      ${cssProperty("font-size", font)}
      color: ${theme.colors.font.body.darken(0.1).toString()};
      outline: none;
      background-color: transparent;

      &::placeholder {
        ${placeholderStyle}
      }
    }
  `;

  const labelledProps = {
    id,
    font,
    label,
    help,
    error,
    hidden: labelHidden,
  };

  const flexProps = {
    className,
    padding,
    "data-focus": ifExists(focus),
    "data-error": ifExists(error),
    gap: theme.spacing[1],
    align: "center" as FlexAlignItems,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onClick: handleClick,
  };

  const flexItemProps = {
    ref: input,
    id,
    w: 1,
    grow: 1,
    autoComplete: autoComplete ? "on" : "off",
    onChange: handleChange,
    onKeyPress: (event: React.SyntheticEvent) => event.stopPropagation(),
    ...inputProps,
  };

  const PrefixMarkup = prefix ? (
    <Flex.Item css={placeholderStyle} shrink={0}>
      {prefix}
    </Flex.Item>
  ) : null;

  const SuffixMarkup = suffix ? (
    <Flex.Item css={placeholderStyle} shrink={0}>
      {suffix}
    </Flex.Item>
  ) : null;

  return (
    <FormLabel {...labelledProps}>
      <Flex css={inputStyle} {...flexProps}>
        {PrefixMarkup}
        <Flex.Item as={multiline ? "textarea" : "input"} {...flexItemProps} />
        {SuffixMarkup}
      </Flex>
    </FormLabel>
  );
}
