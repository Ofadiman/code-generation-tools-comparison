module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.unit\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testEnvironment: 'node',
  snapshotResolver: '<rootDir>/../jest.snapshot-resolver.js',
  setupFilesAfterEnv: ['<rootDir>/../jest.setup.js'],
  moduleNameMapper: {
    '@constants': ['<rootDir>/@constants'],
    '@test-utils': ['<rootDir>/@test-utils'],
    '@types': ['<rootDir>/@types'],
    '@users': ['<rootDir>/users'],
  },
}
