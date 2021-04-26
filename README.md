# Gatsby

Gatsby is a video sharing platform based on peer-to-peer file distribution for
streaming video.

## Packages

### Components Library

`/packages/components` contains a library of React components used to establish
the core design system of the site itself and other future interfaces.

### Icons Library

`/packages/icons` contains all of the icons that we use on Gatsby, all of which
are handmade and are compiled into React SVG components.

### Utilities Library

`/packages/utilities` contains javascript that is meant to simplify code in
other parts of the repository. In addition, there are also tools for interacting
with IPFS within the browser implemented as React hooks.

## Building

To build the repository, simply use `yarn build` while in the project's base
directory. This should build each package in turn. To then launch the site,
you can use `yarn dev` to initiate a development server that supports
hot-reloading, or `yarn start` to run an optimized build.
