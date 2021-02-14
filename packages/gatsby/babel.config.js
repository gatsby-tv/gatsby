module.exports = {
  presets: [
    "next/babel",
    "@babel/preset-typescript",
    "@babel/preset-react",
  ],
  plugins: [
    ["styled-components", { ssr: true }],
  ],
};