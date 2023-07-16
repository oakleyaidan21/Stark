module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-transform-private-methods',
    ['react-native-reanimated/plugin', { loose: true }],
  ], // reanimated needs to be listed last
};
