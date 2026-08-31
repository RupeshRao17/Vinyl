module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Reanimated 4's Babel plugin now lives in react-native-worklets.
    // Must be listed last.
    plugins: ['react-native-worklets/plugin'],
  };
};
