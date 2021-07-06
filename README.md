# Gatsby

Gatsby is a video sharing platform based on peer-to-peer file distribution for
streaming video.

## Packages

### Components

`/packages/components` contains a library of React components used to establish
the core design system of the site.

### Icons

`/packages/icons` contains all of the icons that we use on Gatsby, all of which
are compiled into React SVG components.

### Utilities

`/packages/utilities` contains typescript that is meant to simplify code in
other parts of the repository. In addition, there are also tools for interacting
with IPFS within the browser implemented using React hooks.

### Preview

`/packages/preview` provides the `Preview` component&mdash;the component
dedicated to presenting videos in listings.

### Player

`/packages/player` provides the `Player` component&mdash;the component
that presents videos for playback, providing custom controls for both desktop
and mobile.

### Content

`/packages/content` contains a library of asynchronous components dependent on
requests to our backend.

## Building

To build the repository, simply use `yarn build` while in the project's base
directory. This should build each package in turn. To then launch the site,
you can use `yarn dev` to initiate a development server that supports
hot-reloading, or `yarn start` to run an optimized build.
