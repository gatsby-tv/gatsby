const path = require("path");
const autoprefixer = require("autoprefixer");

module.exports = {
  stories: ["../lib/components/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "@storybook/preset-scss",
      options: {
        cssLoaderOptions: {
          modules: {
            localIdentName: "[name]_[local]__[hash:base64:5]",
          },
        },
        sassLoaderOptions: {
          sassOptions: {
            includePaths: [path.join(__dirname, "..", "lib")],
          },
        },
      },
    }
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: false,
    reactDocgenTypescriptOptions: {},
  },
};
