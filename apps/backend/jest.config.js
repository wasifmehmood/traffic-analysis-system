export default {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'tests/coverage',
  testMatch: ['**/*.test.js'],
  transformIgnorePatterns: [
    '[/\\\\\\\\]node_modules[/\\\\\\\\].+\\\\.(js|ts)$'
  ],
  transform: {},
  coveragePathIgnorePatterns: ['/node_modules/']
}
