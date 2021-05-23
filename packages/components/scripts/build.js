const path = require('path');
const { execSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const run = (command) => execSync(command, { stdio: 'inherit', cwd: root });
const silent = (command) => execSync(command, { cwd: root });

run('yarn run tsc -p tsconfig.json');
silent('yarn run tscpaths -p tsconfig.json -s lib -o dist');
run('yarn run rollup -c');
run("yarn run copyfiles './lib/styles/**/*.scss' './dist/styles' --up=2");
run("yarn run copyfiles './lib/_styles.scss' './dist' --up=1");
run("yarn run copyfiles './static/**/*' './dist' --up=1");
