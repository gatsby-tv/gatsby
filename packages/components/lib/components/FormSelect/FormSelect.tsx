import React, { useState, useRef } from "react";
import { css } from "styled-components";
import { UpDownTick } from "@gatsby-tv/icons";
import {
  ifNotExists,
  ifExists,
  SelectionState,
  useUniqueId,
  useTheme,
} from "@gatsby-tv/utilities";

import { Margin, FlexAlignItems } from "@lib/types";
import { useForm } from "@lib/utilities/form";
import { cssTextInput } from "@lib/styles/typography";
import { cssInputBorder } from "@lib/styles/borders";
import { cssProperty } from "@lib/styles/property";
import { cssMargin } from "@lib/styles/size";
import { Box } from "@lib/components/Box";
import { Flex } from "@lib/components/Flex";
import { Icon } from "@lib/components/Icon";
import { FormLabel } from "@lib/components/FormLabel";

export interface FormSelectProps {
  id?: string;
  className?: string;
  label: string;
  labelHidden?: boolean;
  options: (FormSelectOption | FormSelectGroup)[];
  selection: SelectionState;
  padding?: Margin;
  font?: string;
  help?: string;
  error?: Error;
  placeholder?: string;
  align?: "left" | "center" | "right";
  disabled?: boolean;
  focused?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  name?: string;
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
  value?: string,
  placeholder?: string
) => {
  if (value == null) return placeholder;
  const selected = flattenOptions(options).find(
    (option) => option.value === value
  );
  return selected ? selected.label : placeholder;
};

export function FormSelect(props: FormSelectProps): React.ReactElement {
  const theme = useTheme();
  const id = useUniqueId(props.id ? `select-${props.id}` : "select");
  const { form } = useForm();

  const {
    className,
    label,
    labelHidden,
    options = [],
    selection,
    placeholder,
    font,
    padding = [theme.spacing[0.5], theme.spacing[1]],
    align,
    help,
    error,
    name,
    onChange = () => undefined,
    ...selectProps
  } = props;

  const [focus, setFocus] = useState(Boolean(props.focused));
  const select = useRef<HTMLSelectElement>(null);
  const value = Object.keys(selection).find((item) => selection[item]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.currentTarget.value;
    onChange(value, id);
    if (name) {
      form.set(name, value);
    }
  };

  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(false);
  const handleClick = () => select?.current?.focus();

  const placeholderStyle = css`
    color: ${theme.colors.font.body.fade(0.5).toString()};
  `;

  const selectStyle = css`
    ${cssTextInput}
    ${cssInputBorder}
    ${cssProperty("font-size", font)}
    cursor: pointer;
    border-radius: ${theme.border.radius.small};
    background-color: ${theme.colors.background[4].toString()};

    select {
      ${cssTextInput}
      ${cssProperty("text-align", align, "left")}
      ${cssProperty("font-size", font)}
      outline: none;
      background-color: transparent;
      opacity: 0.001;
      appearance: none;
      text-rendering: auto;
    }

    option {
      ${cssProperty("font-size", font)}
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
    padding,
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

  const ValueMarkup = (
    <Flex.Item as="span" css={ifNotExists(value, placeholderStyle)} grow={1}>
      {getFormSelectedLabel(options, value, placeholder)}
    </Flex.Item>
  );

  return (
    <FormLabel {...labelledProps}>
      <Flex css={selectStyle} {...flexProps}>
        {ValueMarkup}
        <Icon src={UpDownTick} h={1} />
        <Box as="select" {...selectBoxProps}>
          {options.map(parseOptionOrGroup)}
        </Box>
      </Flex>
    </FormLabel>
  );
}
