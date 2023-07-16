const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 * @type {import('metro-config').MetroConfig}
 */

const config = {};

module.exports = mergeConfig(getDefaultconfig(__dirname), config);
