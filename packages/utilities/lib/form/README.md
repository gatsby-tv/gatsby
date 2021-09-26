# Form Context

## `FormContextType`

### `values`
> `Record<string, unknown>`

The current values of the form. Each input form element corresponds to a
key-pair in the record.

### `setValue`
> `(value: unknown, id: string) => void`

Dispatch method for setting the value of a key in `values`. The `id` is the key
to use and is provided by the form field `id`.

### `errors`
> `Record<string, FormErrorState>`

The current errors for each element in the form.

### `setError`
> `(error: FormErrorState, id: string) => void`

Dispatch method for setting an error on a form field with the provided `id`.

## `useForm`
> `() => FormContextType`

Return the current `FormContext`.

## `useOptionalForm`
> `() => FormContextType | undefined`

Return the current `FormContext` if it exists.

## `useFormSelect`
> `() => FormSelectContextType`

Return the current `FormSelectContext`.

## `useFormLabel`
> `(invalid: boolean) => FormLabelContextType`

Return the current `FormLabelContext`.
