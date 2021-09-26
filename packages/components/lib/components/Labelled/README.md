# `Labelled`

`Labelled` is an inlined component wrapper that attaches `aria-labelledby` and
`aria-describedby` props to the wrapped component. Any descendent component that
sets `data-label` or `data-description` will have their ids listed in the
`aria-labelledby` and `aria-describedby` props respectively.

## Props

### `children`
> `React.ReactNode` (optional)

### `component`
> `React.FC<any> | string`

The component to be wrapped.

### `$props`
> `any` (optional)

The props to pass to the component.
