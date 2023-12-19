module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // The test environment that will be used for testing
  // testEnvironment: "jsdom", // 'jsdom' for frontend, 'node' for backend
  testEnvironment: 'jest-environment-jsdom',

  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"
  },

  // Babel integration
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
};

