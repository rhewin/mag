import 'ts-node/register';
import { pathsToModuleNameMapper } from 'ts-jest';
import tsConfig from './tsconfig.json';

const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(tsConfig.compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      diagnostics: {
        warnOnly: true
      }
    }],
  },
  reporters: ["default"]
};

export default config
