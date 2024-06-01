export default {
  clearMocks: true,
  testEnvironment: "jsdom",
  transform: {
    // "^.+\\.tsx?$": [
    //   '@swc/jest',
    //   {
    //     jsc: {
    //       parser: {
    //         syntax: 'typescript',
    //         tsx: true,
    //         decorators: true
    //       },
    //       transform: {
    //         react: {
    //           runtime: 'automatic',
    //         },
    //       },
    //     },
    //   },
    // ],

    '^.+\\.(t|j)sx?$': [
      '@swc-node/jest',
      // configuration
      {
        target: 'esnext',
        module: 'commonjs',
        dynamicImport: true,
        react: {
          // pragma: 'h',
          runtime: 'automatic'
        },
      },
    ],

    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMock.cjs',
  },

  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    // "^.+\\.svg$": "jest-transformer-svg",
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};