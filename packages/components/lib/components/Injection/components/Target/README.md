# `Injection.Target`

Sets the location of a target that `Injection` components can portal into.

## Props
> Extends `React.HTMLAttributes<HTMLElement>`

### `id`
> `string` (optional)

The id of the target. `Injection` components can use this id to portal its
contents into this component's location.

### `index`
> `number` (optional)

If this component occurs in a series, then the `index` prop allows clients to
specify a unique variation of the target that can be targeted by `Injection`.

### `onMount`
> `() => void` (optional)

A callback that is fired whenever an `Injection` component is injected into this
target.
