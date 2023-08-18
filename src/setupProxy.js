/* eslint-disable import/no-extraneous-dependencies */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/services/T0HHFUDBJ/B05NDL383S7/3z2cRsHPpITQMwVFCPMfShSc', {
      target: 'https://hooks.slack.com',
      changeOrigin: true,
    }),
  );
};
