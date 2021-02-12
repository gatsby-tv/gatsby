import React, { useState, useRef } from "react";
import { css } from "styled-components";
import { UpDownTick } from "@gatsby-tv/icons";
import { ifExists, useUniqueId, useTheme } from "@gatsby-tv/utilities";

import { FlexAlignItems } from "@lib/types";
import { cssTextInput } from "@lib/styles/typography";
import { cssInputBorder } from "@lib/styles/borders";
import { Box } from "@lib/components/Box";
import { Flex } from "@lib/components/Flex";
import { Icon } from "@lib/components/Icon";
import { FormLabel } from "@lib/components/FormLabel";

export interface FormSelectProps {
  id?: string;
  className?: string;
  label: string;
  labelHidden?: boolean;
  options?: (FormSelectOption | FormSelectGroup)[];
  selected?: string;
  focused?: boolean;
  help?: string;
  error?: Error;
  onChange?: (value: string, id: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export interface FormSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface FormSelectGroup {
  title: string;
  options: FormSelectOption[];
}

const isGroup = (option: FormSelectOption | FormSelectGroup) =>
  typeof option === "object" && (option as FormSelectGroup).options != null;

const parseOption = (option: FormSelectOption) => (
  <option key={option.value} value={option.value}>
    {option.label}
  </option>
);

const parseGroup = (group: FormSelectGroup) => (
  <optgroup key={group.title} label={group.title}>
    {group.options.map(parseOption)}
  </optgroup>
);

const parseOptionOrGroup = (option: FormSelectOption | FormSelectGroup) =>
  isGroup(option)
    ? parseGroup(option as FormSelectGroup)
    : parseOption(option as FormSelectOption);

const flattenOptions = (options: (FormSelectOption | FormSelectGroup)[]) =>
  options.reduce(
    (
      acc: FormSelectOption[],
      optionOrGroup: FormSelectOption | FormSelectGroup
    ) =>
      isGroup(optionOrGroup)
        ? [...acc, ...(optionOrGroup as FormSelectGroup).options]
        : [...acc, optionOrGroup as FormSelectOption],
    []
  );

const getFormSelectedLabel = (
  options: (FormSelectOption | FormSelectGroup)[],
  value?: string
) => {
  if (value == null) return "";
  const selected = flattenOptions(options).find(
    (option) => option.value === value
  );
  return selected ? selected.label : "";
};

export function FormSelect(props: FormSelectProps): React.ReactElement {
  const theme = useTheme();
  const id = useUniqueId(props.id ? `select-${props.id}` : "select");

  const {
    className,
    label,
    labelHidden,
    options = [],
    selected,
    help,
    error,
    onChange = () => undefined,
    ...selectProps
  } = props;

  const [focus, setFocus] = useState(Boolean(props.focused));
  const select = useRef<HTMLSelectElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.currentTarget.value, id);
  };

  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(false);
  const handleClick = () => select?.current?.focus();

  const selectStyle = css`
    ${cssTextInput}
    ${cssInputBorder}

    select {
      ${cssTextInput}
      outline: none;
      background-color: transparent;
      opacity: 0.001;
      appearance: none;
      text-rendering: auto;
    }
  `;

  const labelledProps = {
    id,
    label,
    help,
    error,
    hidden: labelHidden,
  };

  const flexProps = {
    className,
    "data-focus": ifExists(focus),
    "data-error": ifExists(error),
    gap: theme.spacing[0.5],
    align: "center" as FlexAlignItems,
    padding: [theme.spacing[0.5], theme.spacing[1]],
    onFocus: handleFocus,
    onBlur: handleBlur,
    onClick: handleClick,
  };

  const selectBoxProps = {
    id,
    ref: select,
    absolute: true,
    expand: true,
    w: 1,
    onChange: handleChange,
    onKeyPress: (event: React.SyntheticEvent) => event.stopPropagation(),
    ...selectProps,
  };

  return (
    <FormLabel {...labelledProps}>
      <Flex css={selectStyle} {...flexProps}>
        <Flex.Item as="span" grow={1}>
          {getFormSelectedLabel(options, selected)}
        </Flex.Item>
        <Flex.Item as="span">
          <Icon src={UpDownTick} h={1} ariaLabel="Selection Arrows" />
        </Flex.Item>
        <Box as="select" {...selectBoxProps}>
          {options.map(parseOptionOrGroup)}
        </Box>
      </Flex>
    </FormLabel>
  );
}
