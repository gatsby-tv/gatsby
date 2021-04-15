const path = require("path");
const { execSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const run = (command) => execSync(command, { stdio: "inherit", cwd: root });

run("yarn run tsc -p tsconfig.json");
run("yarn run rollup -c");
