module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['babel-jest'],
  },
  transformIgnorePatterns: [
    'node_modules/(?!tslog/)',
  ],
  moduleNameMapper: {
    '^tslog$': '<rootDir>/test/__mocks__/tslog.ts',
  },
  testMatch: ['**/test/**/*.test.ts'],
  collectCoverageFrom: ['src/**/*.ts'],
};
