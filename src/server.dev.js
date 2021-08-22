const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(
      '/api',
      createProxyMiddleware({
        target: process.env.WESTEGG_URL,
        pathRewrite: {
          '^/api/': '/',
        },
        changeOrigin: true,
      })
    );

    server.all('*', handler);
    server.listen(port);
  })
  .catch(console.error);
