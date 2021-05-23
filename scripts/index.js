const path = require("path");
const { execSync } = require("child_process");

const root = path.resolve(__dirname, "..");

module.exports = {
  root,
  run: (command) => execSync(command, { stdio: "inherit", cwd: root }),
  silent: (command) => execSync(`yarn run ${command}`, { cwd: root }),
  parallel: (...commands) =>
    execSync(
      `yarn run concurrently ${commands
        .map((command) => `'${command}'`)
        .join(" ")}`,
      { stdio: "inherit", cwd: root }
    ),
};
