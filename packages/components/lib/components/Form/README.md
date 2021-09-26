# `Form`

The main `<form />` element abstraction. Forms represent a record object that
maps keys and values that can either be sent to a REST endpoint as JSON or
embedded within a parent form. All input components that are a direct descendent
of the `Form` component produce a new field for the object and provide values
for their given key.

If any child fields/inputs have errors, this will disable the form from
submitting; or, if the form is embedded within a parent form, the error will be
propagated up to the parent.

This component is meant to be used in conjunction with

- [`Form.Field`](./components/Field/README.md)

- [`Form.File`](./components/File/README.md)

- [`Form.Label`](./components/Label/README.md)

- [`Form.Select`](./components/Select/README.md)

- [`Form.Slider`](./components/Slider/README.md)

## Props
> Extends `React.FormHTMLAttributes<HTMLElement>`

### `id`
> `string`

All forms are required to have an `id` which is used in situations where the
`Form` is nested within another.

### `onSubmit`
> `(values: Record<string, any>, id?: string) => void` (optional)

The callback to execute whenever the form is submitted. Usually this happens
whenever a `Button` component with `type="submit"` is clicked. The `values`
argument is the record of all the values of its descendant fields/inputs. The
`id` argument is the `id` of the form.

### `onError`
> `(error: FormError | undefined, id?: string) => void` (optional)

The callback to fire whenever the form has received an error from one of its
fields/inputs.

## Example

```tsx
import { Form, Button } from '@gatsby-tv/components';
import { useUniqueId, useChangeSet, Validators } from '@gatsby-tv/utilities';
import { User } from '@gatsby-tv/types';

export interface UserFormProps {
  user: User;
}

export function UserForm(props: UserFormProps) {
  const { user } = props;
  const id = useUniqueId('user');

  const { pristine, updates, values, serValue } = useChangeSet(
    {
      name: '',
      handle: '',
      description: user.description,
    },
    [user.description]
  );

  return (
    <Form id={id}>
      <Form.Label for="name" label="Display Name">
        <Form.Field
          id="name"
          type="text"
          placeholder={user.name}
          value={values.name as string}
          onChange={setValue}
          validators={[
            Validators.maxLength(50, 'Display name cannot be longer than 50 characters')
          ]}
        />
      </Form.Label>
      <Form.Label for="handle" label="Handle">
        <Form.Field
          id="handle"
          type="text"
          prefix="@"
          placeholder={user.handle}
          value={values.handle as string}
          onChange={setValue}
          validators={[
            Validators.minLength(4, 'Handle must be at least 4 characters long'),
            Validators.maxLength(20, 'Handle cannot be longer than 20 characters'),
            Validators.pattern(
              /^[a-zA-Z0-9_]+$/,
              'Handles can only consist of letters, numbers, and underscores'
            ),
          ]}
        />
      </Form.Label>
      <Form.Label for="description" label="Description">
        <Form.Field
          id="description"
          type="text"
          multiline
          placeholder={user.description}
          value={values.description as string}
          onChange={setValue}
        />
      </Form.Label>
      <Button type="submit" disabled={pristine}>
        Submit
      </Button>
    </Form>
  );
}
```
