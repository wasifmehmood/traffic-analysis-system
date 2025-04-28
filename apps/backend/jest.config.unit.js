import commonConfig from './jest.config.js';

export default {
  ...commonConfig,
  testMatch: [
    '**/*.unit.test.{js,ts,mjs}'
  ],
  collectCoverageFrom: [
    '**/modules/**/*.js',
    '**/src/clients/*.js',
    '**/src/services/*.js',
    '**/src/common/utils.js'
  ],
  coverageDirectory: 'coverage/unit'
};