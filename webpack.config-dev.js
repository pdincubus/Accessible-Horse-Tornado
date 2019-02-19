const prodConfig = require('./webpack.config-prod');

module.exports = {
    ...prodConfig,
    mode: 'development',
};
