import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  moduleFileExtensions: ['ts', 'js'],
  modulePathIgnorePatterns: ['./jest.config.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

export default config;