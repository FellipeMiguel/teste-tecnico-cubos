export default {
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["<rootDir>/src/polyfills.js"], // Será executado antes do ambiente ser configurado
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"], // Executado depois que o ambiente estiver pronto
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
    "\\.(svg|png|jpg|gif)$": "<rootDir>/__mocks__/fileMock.js",
  },
  moduleFileExtensions: ["js", "jsx"],
};
