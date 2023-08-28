/* eslint-disable import/no-extraneous-dependencies */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware(process.env.REACT_APP_SLACK_END_POINT, {
      target: process.env.REACT_APP_SLACK_BASE_URL,
      changeOrigin: true,
    }),
  );
};
