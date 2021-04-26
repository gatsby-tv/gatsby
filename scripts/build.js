const path = require("path");
const { execSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const run = (command) => execSync(command, { stdio: "inherit", cwd: root });

// yarn workspaces foreach --topological ... doesn't currently work.
run("yarn workspace @gatsby-tv/icons run build");
run("yarn workspace @gatsby-tv/utilities run build");
run("yarn workspace @gatsby-tv/components run build");
run("yarn workspace @gatsby-tv/preview run build");
run("yarn workspace @gatsby-tv/player run build");
run("yarn workspace @gatsby-tv/content run build");
run("yarn run next build");
