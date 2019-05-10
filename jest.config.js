module.exports = {
  collectCoverage: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts'
  ],
  testMatch: [
    '<rootDir>/tests/**/*.test.ts'
  ],
  "moduleNameMapper": {
    "^tests/(.*)$": "<rootDir>/tests/$1",
    "^app/(.*)$": "<rootDir>/src/$1"
  }
};
