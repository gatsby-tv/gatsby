# Gatsby shared components for React clients

This repo is a collection of common React components written in TypeScript/TSX to be used with React clients for Gatsby.

## Usage in other projects

1. Install to the project `npm install --save @gatsby-tv/components`
2. Import the components `import { Sidebar, Navbar } from "@gatsby-tv/components";`

## Publish to npm

1. `npm install`
2. `npm run build`
3. `npm login`
4. `npm publish`

## Test and install on projects locally without needing to publish

1. `cd ~/components`
2. `npm link`
3. `cd ~/my-react-project`
4. `npm link @gatsby-tv/components`
5. Every time you make a change to this repo, make sure to run `npm run build` to update the link.

## Run storybook examples and docs

Storybook shows examples on usage and documentation of the components in this library.

1. `npm run storybook`
