/* eslint-disable import/no-extraneous-dependencies */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = function override(config, env) {
  if (env === 'production') {
    // Add the BundleAnalyzerPlugin to the production configuration
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};
