module.exports = {
  collectCoverage: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts'
  ],
  testMatch: [
    '<rootDir>/tests/**/*.test.ts'
  ]
};
