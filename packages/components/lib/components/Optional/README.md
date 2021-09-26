# `Optional`

An inlined wrapper component that uses a boolean value to determine whether the
child elements should be wrapped by the provided component.

## Props

### `children`
> `React.ReactNode` (optional)

### `component`
> `React.FC<any> | string` (optional)

The component that is wrapped, by default this is `"div"`.

### `active`
> `boolean` (optional)

A boolean value that controls whether the component provided in the `component`
prop will wrap its child nodes. If set to false, the children are returned as a
fragment.

### `$props`
> `any` (optional)

The props to pass the wrapped component.
