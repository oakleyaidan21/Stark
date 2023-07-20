module.exports = {
  preset: 'react-native',
  setupFiles: ['./jestSetup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: ['node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)'],
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
};
