module.exports = {
  resolveSnapshotPath: (testPath, _snapshotExtension) => {
    return testPath.replace(/\.spec\.([tj]sx?)/, '.snapshot')
  },
  resolveTestPath: (snapshotFilePath, _snapshotExtension) =>
    snapshotFilePath.replace('.snapshot', ''),
  testPathForConsistencyCheck: '',
}
