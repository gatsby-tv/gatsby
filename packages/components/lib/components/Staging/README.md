# `Staging`

`Staging` takes a list of `Staging.Stage` components and creates a container
that can limit visibility to display only one `Staging.Stage` item at a time.
This action is controlled by an index.

## Props

### `children`
> `React.ReactNode` (optional)

Children are expected to be `Staging.Stage` components.

### `stage`
> `number`

The current stage to display. Whenever the current stage is changed, the new
stage will slide into frame while the current stage slides out in the opposite
direction.
