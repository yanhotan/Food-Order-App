// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const blacklist = require('metro-config/src/defaults/exclusionList');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  // Add the blacklist for duplicate `package.json`
  config.resolver.blacklistRE = blacklist([/react_native_app\/package\.json/]);

  return config;
})();
