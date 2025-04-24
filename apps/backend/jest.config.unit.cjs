const commonConfig = require('./jest.config.cjs');

module.exports = {
  ...commonConfig,
  testMatch: [
    '**/*.unit.test.{js,ts}'
  ],
  collectCoverageFrom: [
    '**/modules/**/*.js',
    '**/src/clients/*.js',
    '**/src/services/*.js',
    '**/src/common/utils.js'
  ],
  coverageDirectory: 'coverage/unit'
};