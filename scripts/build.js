const { run, parallel } = require('./index');

// yarn workspaces foreach --topological ... doesn't currently work.
parallel(
  'yarn icons',
  'yarn workspace @gatsby-tv/icons run build',
  'yarn workspace @gatsby-tv/utilities run build'
);
run('yarn workspace @gatsby-tv/components run build');
parallel(
  'yarn workspace @gatsby-tv/preview run build',
  'yarn workspace @gatsby-tv/player run build'
);
run('yarn workspace @gatsby-tv/content run build');
run('yarn run next build');
run('yarn run cross-env NODE_ENV=production webpack');
