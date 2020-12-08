const path = require("path")
const webpack = require("webpack")

module.exports = {
  webpack: config => {
    config.resolve.alias["@src"] = path.resolve(`${__dirname}/src`)
    return config
  }
}
