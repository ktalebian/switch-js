module.exports = {
  coverageDirectory: "./coverage/",
  collectCoverage: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/index.ts',
  ],
  testMatch: [
    '<rootDir>/tests/**/*.test.ts'
  ],
  "moduleNameMapper": {
    "^tests/(.*)$": "<rootDir>/tests/$1",
    "^app/(.*)$": "<rootDir>/src/$1"
  }
};
