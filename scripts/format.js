const path = require("path");
const { execSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const run = (command) => execSync(command, { stdio: "inherit", cwd: root });

run("yarn workspaces foreach run format");
run("yarn run prettier --write \"**/*.{js,jsx,ts,tsx,json}\"");
