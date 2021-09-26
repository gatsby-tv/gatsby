# `Form.Select`

An input field that allows the user to select from a list of options.

## Props
> Extends `React.SelectHTMLAttributes<HTMLElement>`

### `id`
> `string`

The key to use in the form record.

### `options`
> `SelectOption[]`

The list of options that the user can select from. Each `SelectOption` type is
an object with a `value` field (usually a string) and a `label` string that is
displayed to the user. Whenever an option is selected, the `value` field is what
is stored in the form record.

### `multiple`
> `boolean` (optional)

Whenever `multiple` is set, options that are selected by the user are added to
an array of selections. Each selection appears as a small tag where each is
equipped with a clear button that can remove it from the list.

### `searchable`
> `boolean` (optional)

Specifies whether the user can type into the input field to query for available
options.

### `clearable`
> `boolean` (optional)

When true, adds a small clear button to the input field that allows the user to
clear the currently selected option(s).

### `onChange`
> `FormChangeHandler`

A callback that is fired whenever the user selects a new option.
