const path = require("path");
const webpack = require("webpack");
const withTM = require("next-transpile-modules")(["@gatsby-tv/components", "@gatsby-tv/utilities"]);

const config = {
  webpack: (config) => {
    config.resolve.alias["@src"] = path.resolve(`${__dirname}/src`);
    return config;
  },
};

module.exports = withTM(config);
