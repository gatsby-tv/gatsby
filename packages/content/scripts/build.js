const path = require('path');
const { execSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const run = (command) => execSync(command, { stdio: 'inherit', cwd: root });
const silent = (command) => execSync(command, { cwd: root });

run('yarn run tsc -p tsconfig.json');
silent('yarn run tscpaths -p tsconfig.json -s lib -o dist');
run('yarn run rollup -c');
