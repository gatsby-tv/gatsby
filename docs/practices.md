# Coding Practices

## React Development

### Use only functional components

All components in this project are expected to be functional components,
leveraging React's hooks API.

### Only one component per file 

Every `tsx` file exports only a single React component. If additional components
are needed, the creation of a new `components` directory is necessary. If this
is the case, however, these nested components should *not* be expected to be
imported directly by any other component. If access to these additional
components is necessary from external modules, then they should be attached to
the main component by setting them as an object property.

As a general rule, deep directory nesting is fine; but all module imports should
be as shallow as possible.

### All state should be controlled by a React hook

Do not use references to stateful objects that aren't managed by React. Worst
case scenario is that one can utilize the `useRef` hook, but more than often one
should defer to `useState`.

## Commits and Branches

If you are creating a branch on the main repository, then we require that the
branch follow the naming convention: `type/#issue/description-in-kebab-case`.

Commits should be squashed in PRs before merging, using the commit message
format: `type: description (#issue)`.

Where, in both cases, `type` can be one of `bugfix`, `cleanup`, `feature`,
`refactor`, and `chore`. Likewise, the `#issue` refers to the issue number the
commit/branch refers to.

Make sure to also provide multiline commit messages describing any changes
auxiliary to the issue being addressed, as well as notes on any nontrivial
implementation details.
