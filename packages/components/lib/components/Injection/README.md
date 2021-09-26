# `Injection`

This wild component is used to dynamically construct React portals &mdash;
allowing components to be teleported around the document to targets that are set
by the [`Injection.Target`](./components/Target/README.md) component.

Injections work by two parts: the target, which creates a `<div />` that can be
selected by the React portal; and the portal itself, which houses the child
elements to be injected into the target. The key of `Injection`'s design is to
allow for users to use `Injection.Target` without worry of littering the
document's HTML &mdash; meaning that if there does not exist an `Injection`
component that is set to portal into a given `Injection.Target`, then the
`Injection.Target` does not create an empty `<div />`.

Targets are identified by a string used as its id and, optionally, an index.
The use of an index allows clients to create an arbitrary list of targets
(allowing one, for example, to interweave targets into an infinite listing of
elements). However, it is important to note that id's share a *global
namespace*, meaning that name collisions are a prevalent concern. It is
therefore highly recommended to use the `useUniqueId` hook provided in
`@gatsby-tv/utilities` package to specify target ids (passing the ids down to
child components as necessary).

However, there are two targets that intentionally violate this rule. These
targets are `"$background"` and `"$foreground"`. These targets are used for
rendering components behind all other components (e.g. for page animations like
`Fireworks`) or in front of them (e.g. for modals). These targets are set in
`AppProvider`.

## Props

### `children`
> `React.ReactNode` (optional)

### `target`
> `string` (optional)

The `id` of the `Injection.Target` to portal into. If the `id` is `undefined`,
then the `Injection` is simply not rendered.

It is important to note that the `target` prop is *mutable*. This means that
`Injection` components can teleport between locations depending on the logic
that sets the target id. This, however, is a costly operation and should only be
used sparingly. This should only be used for responsively restructuring a page's
layout whenever the window is resized.

### `index`
> `number` (optional)

The index of the target to portal into.
